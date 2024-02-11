import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik, FormikValues } from 'formik';

import axiosInstance from '@/services/restaurantAPI';
import useMutation from '@/hooks/useMutation';
import { PATHS } from '@/constants/paths';
import { userInfoFormInputs } from '@/content/accountForms/userInfoFormInputs';
import { userFormSchema } from '@/validationSchemas/userFormSchema';
import { TextInput } from '@/components/atoms';
import LoadingButtonFC from '@/components/atoms/LoadingButton/LoadingButton';

import avatarHolderPic from '@/assets/images/avatar-icon-holder.jpeg';
import styles from './UserInfoForm.module.css';
import { useAuth } from '@/hooks/useAuth';

const URL = '/images';
const validFileTypes = ['image/jpeg', 'image/png', 'image/jpg'];

const UserInfoForm = () => {
  const { user } = useAuth();
  const userId = user.id;
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState<boolean>(false);
  const { mutate: uploadImage, isLoading: uploading } = useMutation({
    url: URL,
  });
  const [error, setError] = useState('');
  const formik = useFormik({
    initialValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      password: '',
    },
    validationSchema: userFormSchema,
    onSubmit: async ({ firstName, lastName, email, phone }: FormikValues) => {
      try {
        const response = await axiosInstance.patch(`/users/${userId}`, {
          firstName: firstName,
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
      // navigate(0);
    },
  });

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
          <img
            src={user.avatar ? user.avatar : avatarHolderPic}
            alt="profile pic"
          />
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
