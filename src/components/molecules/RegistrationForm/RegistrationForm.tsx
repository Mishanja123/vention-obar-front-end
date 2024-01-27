import { useFormik } from 'formik';
import { userFormSchema } from '@/validationSchemas/userFormSchema';
import { userInfoFormInputs } from '@/content/accountForms/userInfoFormInputs';
import { Button, TextInput } from '@/components/atoms';
import styles from './RegistrationForm.module.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from '@/store/auth/operations';
import { RootState } from '@/store/store';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<RootState>();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
    },
    validationSchema: userFormSchema,
    onSubmit: async (values) => {
      console.log(values);
      dispatch(register(values));
      const { email, password } = values;
      await dispatch(login({ email, password }));
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
