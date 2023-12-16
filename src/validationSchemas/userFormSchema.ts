import { object, string } from 'yup';

export const userFormSchema = object({
  firstName: string()
    .required('First name is required')
    .min(3, 'First name should be at least 3 characters')
    .max(20, 'First name should not exceed 20 characters')
    .nullable(),
  lastName: string()
    .required('Last name is required')
    .min(3, 'Last name should be at least 3 characters')
    .max(20, 'Last name should not exceed 20 characters')
    .nullable(),
  email: string()
    .email('Invalid email address')
    .required('Email is required')
    .min(6, 'Email should be at least 6 characters')
    .max(30, 'Email should not exceed 30 characters')
    .nullable(),
  phone: string()
    .matches(
      /^[+]?[0-9]+$/,
      'Invalid phone number format: Example +191 000 000',
    )
    .min(12, 'Phone number should be at least 12 characters')
    .max(15, 'Phone number should not exceed 15 characters')
    .required('Phone number is required'),
  password: string()
    .min(8, 'Password should be at least 8 characters')
    .max(20, 'Password should not exceed 20 characters')
    .matches(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,}$/,
      'Invalid password format. It should contain at least one digit, one special character, and one uppercase letter.',
    )
    .required('Password is required'),
});
