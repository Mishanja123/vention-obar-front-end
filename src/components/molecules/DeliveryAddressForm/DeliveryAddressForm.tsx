import { useState } from 'react';
import { useFormik, FormikValues } from 'formik';

import { deliveryAddressFormSchema } from '@/validationSchemas/deliveryAddressFormSchema';
import { deliveryAddressFormInputs } from '@/content/accountForms/deliveryAddressFormInputs';

import { TextInput } from '@/components/atoms';

import styles from './DeliveryAddressForm.module.css';

interface IUserAddress {
  addressTitle: string;
  city: string;
  street: string;
  houseNumber: string;
  unit: string;
  flat: string;
}

const DeliveryAddressForm = () => {
  const [userAddress, setUserAddress] = useState<IUserAddress>({
    addressTitle: '',
    city: '',
    street: '',
    houseNumber: '',
    unit: '',
    flat: '',
  });

  const [formMode, setFormMode] = useState<'add' | 'edit' | 'save'>('add');

  console.log('🚀 : userAddress', userAddress);
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

      setUserAddress({
        addressTitle,
        city,
        street,
        houseNumber,
        unit,
        flat,
      });

      setFormMode('edit');
    },
  });

  const handleSaveClick = () => {
    setFormMode('add');
  };

  return (
    <div className={styles.delivery_address_section}>
      <form onSubmit={formik.handleSubmit} className={styles.delivery_form}>
        {formMode === 'add' && !userAddress.addressTitle && (
          <button
            type="submit"
            data-testid="1"
            className={styles.delivery_address_button}>
            Add Delivery Address
          </button>
        )}

        {formMode === 'edit' && (
          <button
            type="button"
            data-testid="2"
            className={styles.delivery_address_button}
            onClick={handleSaveClick}>
            Edit Delivery Changes
          </button>
        )}

        {formMode === 'add' && userAddress.addressTitle && (
          <button
            data-testid="3"
            type="submit"
            className={styles.delivery_address_button}>
            Save Delivery Address
          </button>
        )}

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
      </form>
    </div>
  );
};

export default DeliveryAddressForm;
