import axios from 'axios';
import { useFormik, FormikValues } from 'formik';
import styles from './LoginForm.module.css';
import { loginInputs } from '@/content/authForms/loginInputs';
import { Button, TextInput } from '@/components/atoms';
import { loginShema } from '@/validationSchemas/loginShema';

const LoginForm = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginShema,
    onSubmit: async ({ email, password }: FormikValues) => {
      try {
        const response = await axios.post(
          'http://localhost:3000/api/auth/login',
          { email, password },
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          },
        );

        const result = await response.data;
        console.log(result);
      } catch (error) {
        console.error(`Error: ${error}`);
      }
    },
  });
  return (
    <div className={styles.login_wrapper}>
      <h3 className={styles.login_title}>Login</h3>
      <form onSubmit={formik.handleSubmit}>
        {loginInputs.map((input, i) => (
          <label htmlFor={input.name} key={i}>
            <TextInput {...input} formik={formik} />
          </label>
        ))}
        <div className={styles.login_btn}>
          <Button variant="contained" type="submit">
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
