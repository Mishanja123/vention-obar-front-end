import { useFormik, FormikValues } from 'formik';

import styles from './DeliveryAddressForm.module.css';
import { TextInput } from '../../atoms';
// import { deliveryAddressFormSchema } from '@/validationSchemas/deliveryAddressFormSchema';
import { deliveryAddressFormSchema } from '../../../validationSchemas/deliveryAddressFormSchema';
import { deliveryAddressFormInputs } from '../../../content/accountForms/deliveryAddressFormInputs';

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
      <button className={styles.delivery_address_button}>
        Add Delivery Address
      </button>
      <form onSubmit={formik.handleSubmit} className={styles.delivery_form}>
        {deliveryAddressFormInputs.slice(0, 3).map((input, i) => (
          <label htmlFor={input.name} key={i}>
            <TextInput {...input} formik={formik} />
          </label>
        ))}
        <div className={styles.bulding_address_wrapper}>
          {deliveryAddressFormInputs.slice(3).map((input, i) => (
            <label
              htmlFor={input.name}
              className={styles.delivery_address_label}
              key={i}
            >
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
