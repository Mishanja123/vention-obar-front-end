import * as yup from 'yup';

export const validationSchema = yup.object({
  nickname: yup.string().required('Nickname is required'),
  city: yup.string().required('City is required'),
  street: yup.string().required('Street address is required'),
  house: yup.number().required('House number is required'),
  unit: yup.number().required('Unit number is required'),
  flat: yup.number().required('Flat number is required'),
});
