import { useFormik, FormikValues } from 'formik';
import { userFormSchema } from '@/validationSchemas/userFormSchema';
import { userInfoFormInputs } from '@/content/accountForms/userInfoFormInputs';
import { Button, TextInput } from '@/components/atoms';
import axios from 'axios';
import styles from './RegistrationForm.module.css';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const navigate = useNavigate();

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
      const response = axios.post(
        'http://localhost:3000/api/auth/sign-up',
        { first_name: firstName, last_name: lastName, email, phone, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      );

      const result = (await response).data;
      console.log(result);
    },
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit} className={styles.registration_form}>
        <h3 className={styles.registration_title}>Registration</h3>
        {userInfoFormInputs.map((input, i) => (
          <label htmlFor={input.name} key={i}>
            <TextInput {...input} formik={formik} />
          </label>
        ))}
        <div className={styles.registration_btn}>
          <Button variant="contained" type="submit">
            Sign-up
          </Button>
        </div>
      </form>
      <button onClick={() => navigate('login')} className={styles.login_btn}>
        Login
      </button>
    </div>
  );
};

export default RegistrationForm;
