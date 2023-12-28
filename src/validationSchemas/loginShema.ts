import { object, string } from 'yup';

export const loginShema = object({
  email: string()
    .email('Invalid email address')
    .required('Email is required')
    .min(6, 'Email should be at least 6 characters')
    .max(30, 'Email should not exceed 30 characters')
    .nullable(),
  password: string()
    .min(8, 'Password should be at least 8 characters')
    .max(20, 'Password should not exceed 20 characters')
    .matches(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,}$/,
      'Invalid password format. It should contain at least one digit, one special character, and one uppercase letter.',
    )
    .required('Password is required'),
});
