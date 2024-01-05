import { useFormik, FormikValues } from 'formik';

import styles from './DeliveryAddressForm.module.css';

import { deliveryAddressFormSchema } from '@/validationSchemas/deliveryAddressFormSchema';
import { deliveryAddressFormInputs } from '@/content/accountForms/deliveryAddressFormInputs';

import { TextInput } from '@/components/atoms';

const DeliveryAddressForm = () => {
  const formik = useFormik({
    initialValues: {
      addressTitle: '',
      city: '',
      street: '',
      houseNumber: '',
      unit: '',
      flat: '',
    },
    validationSchema: deliveryAddressFormSchema,
    onSubmit: ({
      addressTitle,
      city,
      street,
      houseNumber,
      unit,
      flat,
    }: FormikValues) => {
      console.log(addressTitle, city, street, houseNumber, unit, flat);
    },
  });

  return (
    <div className={styles.delivery_address_section}>
      <form onSubmit={formik.handleSubmit} className={styles.delivery_form}>
        <button className={styles.delivery_address_button}>
          Add Delivery Address
        </button>
        {deliveryAddressFormInputs.slice(0, 3).map((input, i) => (
          <label htmlFor={input.name} key={i}>
            <TextInput {...input} formik={formik} />
          </label>
        ))}
        <div className={styles.building_address_wrapper}>
          {deliveryAddressFormInputs.slice(3).map((input, i) => (
            <label htmlFor={input.name} key={i}>
              <TextInput {...input} formik={formik} />
            </label>
          ))}
        </div>
        <button type="submit" className={styles.delivery_address_button}>
          Edit / Save changes
        </button>
      </form>
    </div>
  );
};

export default DeliveryAddressForm;
