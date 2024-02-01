import { object, string } from 'yup';

export const paymentSchema = object({
  addressTitle: string().required('Address title is required'),
  cardNumber: string()
    .matches(/^\d{16}$/, 'Card number must be a 16-digit number')
    .required('Card number is required'),
  cardHolder: string().required('cardHolder name is required'),
  cvvNumber: string()
    .matches(/^\d{3}$/, 'CVV must be a 3-digit number')
    .required('CVV is required'),
  month: string().required('Expiration month is required'),
  year: string().required('Expiration year is required'),
});
