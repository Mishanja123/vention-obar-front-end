import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import styles from './LoginForm.module.css';
import { loginInputs } from '@/content/authForms/loginInputs';
import { Button, TextInput } from '@/components/atoms';
import { loginShema } from '@/validationSchemas/loginShema';
import { useDispatch } from 'react-redux';
import { login } from '@/store/auth/operations';
import { RootState, TypedDispatch } from '@/store/store';
import { useAuth } from '@/hooks/useAuth';

const LoginForm = () => {
  const navigate = useNavigate();
  const { isFetching } = useAuth();
  const dispatch = useDispatch<TypedDispatch<RootState>>();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginShema,
    onSubmit: async (values) => {
      await dispatch(login(values));
    },
  });

  return (
    <div className={styles.login_wrapper}>
      <form onSubmit={formik.handleSubmit} className={styles.login_form}>
        <h3 className={styles.login_title}>Login</h3>
        {loginInputs.map((input, i) => (
          <label
            htmlFor={input.name}
            key={i}
            className={styles.login_form_label}>
            <TextInput {...input} formik={formik} />
          </label>
        ))}
        <div className={styles.login_btn}>
          <Button
            variant="contained"
            type="submit"
            isValid={isFetching ? true : false}>
            Login
          </Button>
        </div>
      </form>
      <button className={styles.forgot_password_btn}>Forgot password?</button>
      <button
        onClick={() => navigate('/auth')}
        className={styles.registration_btn}>
        Registration
      </button>
    </div>
  );
};

export default LoginForm;
