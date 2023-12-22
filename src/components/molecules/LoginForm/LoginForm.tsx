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
    onSubmit: ({ email, password }: FormikValues) => {
      console.log(email, password);
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
