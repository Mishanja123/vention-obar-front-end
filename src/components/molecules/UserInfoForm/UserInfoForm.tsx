import { useFormik, FormikValues } from 'formik';
import React from 'react';
import styles from './UserInfoForm.module.css';
import { userInfoFormInputs } from '@/content/accountForms/userInfoFormInputs';
import { userFormSchema } from '@/validationSchemas/userFormSchema';
import { TextInput } from '@/components/atoms';
import { useEffect, useState } from 'react';
import { getUserInfo } from './userInfo';
import axiosInstance from '@/services/restaurantAPI';
import useMutation from '@/hooks/useMutation';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/constants/paths';
import LoadingButtonFC from '@/components/atoms/LoadingButton/LoadingButton';

const URL = '/images';
const validFileTypes = ['image/jpeg', 'image/png', 'image/jpg'];

const UserInfoForm = () => {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [userId, setUserId] = useState<number>();
  const [avatar, setAvatar] = useState<string>();
  const { mutate: uploadImage, isLoading: uploading } = useMutation({
    url: URL,
  });
  const [error, setError] = useState('');
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
        console.log('updatedUser', updatedUser);
      } catch (err) {
        console.log(err);
      }
      setEditMode(false);
      navigate(PATHS.ACCOUNT);
    },
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUserInfo();
        console.log(userData);
        const userInformation = userData?.user;
        setUserId(userInformation?.id);
        setAvatar(userInformation?.avatar);
        setUserId(userInformation?.id);
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
  }, [formik]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    const file = e.target.files[0];

    if (!validFileTypes.find((type) => type === file.type)) {
      setError('File must be in JPG/PNG format');
      return;
    }
    const form = new FormData();
    form.append('image', file);
    await uploadImage({ file: form, userId });
  };
  return (
    <div className={styles.user_info_section}>
      <div className={styles.user_image_wrapper}>
        <div className={styles.image}>
          <img src={avatar} alt="profile pic" />
        </div>
        <LoadingButtonFC
          uploading={uploading}
          editMode={editMode}
          handleChange={handleChange}
        />
        {error && <div className={styles.error}>{error}</div>}
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
