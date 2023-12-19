import { object, string } from 'yup';

export const deliveryAddressFormSchema = object({
  addressTitle: string().required('Address title is required'),
  city: string().required('City is required'),
  street: string().required('Street is required'),
  houseNumber: string().required('House number is required'),
  unit: string().required('Unit number is required'),
  flat: string().required('Flat number is required'),
});
