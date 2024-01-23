import { useFormik, FormikValues } from 'formik';

import styles from './UserInfoForm.module.css';

import sprite from '@/assets/sprite.svg';

import { userInfoFormInputs } from '@/content/accountForms/userInfoFormInputs';
import { userFormSchema } from '@/validationSchemas/userFormSchema';
import { TextInput } from '@/components/atoms';
import { useEffect, useState } from 'react';
import { getUserInfo } from './userInfo';
import axiosInstance from '@/services/restaurantAPI';

const UserInfoForm = () => {
  const [editMode, setEditMode] = useState(false);
  const [userId, setUserId] = useState<number>();
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
    },
    validationSchema: userFormSchema,
    onSubmit: async ({
      firstName,
      lastName,
      email,
      phone,
      password,
    }: FormikValues) => {
      console.log(firstName, lastName, email, phone, password);
      try {
        const response = await axiosInstance.patch(`/users/${userId}`, {
          first_name: firstName,
          lastName: lastName,
          email: email,
          phone: phone,
        });
        const updatedUser = response.data;
      } catch (err) {
        console.log(err);
      }
      setEditMode(false);
    },
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUserInfo();
        const userInformation = userData?.user;
        setUserId(userInformation?.id!);
        formik.setValues({
          firstName: userInformation?.first_name || '',
          lastName: userInformation?.last_name || '',
          email: userInformation?.email || '',
          phone: userInformation?.phone || '',
          password: '',
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styles.user_info_section}>
      <div className={styles.user_image_wrapper}>
        <svg width="150" height="150">
          <use href={`${sprite}#icon-avatar`} aria-expanded="true"></use>
        </svg>
        <button className={styles.image_change_button}>Change</button>
      </div>
      <form
        className={styles.user_info_form}
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit(e);
        }}>
        {userInfoFormInputs.map((input, i) => (
          <label htmlFor={input.name} key={i}>
            <TextInput {...input} formik={formik} disabled={!editMode} />
          </label>
        ))}
        {editMode ? (
          <button type="submit" className={styles.image_change_button}>
            Save
          </button>
        ) : (
          <button
            type="button"
            className={styles.image_change_button}
            onClick={() => setEditMode(true)}>
            Edit
          </button>
        )}
      </form>
    </div>
  );
};

export default UserInfoForm;
