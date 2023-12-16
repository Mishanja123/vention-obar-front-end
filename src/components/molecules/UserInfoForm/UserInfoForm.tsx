import { userInfoFormInputs } from '../../../content/accountForms/userInfoFormInputs';
import { userFormSchema } from '../../../validationSchemas/userFormSchema';
import { TextInput } from '../../atoms';
import styles from './UserInfoForm.module.css';
import { useFormik, FormikValues } from 'formik';

const UserInfoForm = () => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
    },
    validationSchema: userFormSchema,
    onSubmit: ({
      firstName,
      lastName,
      email,
      phone,
      password,
    }: FormikValues) => {
      console.log(firstName, lastName, email, phone, password);
    },
  });
  return (
    <div className={styles.user_info_section}>
      <div className={styles.user_image_wrapper}>
        <svg width="150" height="150">
          <use
            href="../../../src/assets/sprite.svg#icon-avatar"
            aria-expanded="true"
          ></use>
        </svg>
        <button className={styles.image_change_button}>Change</button>
      </div>
      <form className={styles.user_info_form} onSubmit={formik.handleSubmit}>
        {userInfoFormInputs.map((input, i) => (
          <label htmlFor={input.name} key={i}>
            <TextInput {...input} formik={formik} />
          </label>
        ))}
        <button type="submit" className={styles.image_change_button}>
          Edit/Save changes
        </button>
      </form>
    </div>
  );
};

export default UserInfoForm;
