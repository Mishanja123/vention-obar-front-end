import { useFormik, FormikValues } from 'formik';
import { useEffect, useState } from 'react';

import styles from './Payment.module.css';

import { paymentSchema } from '@/validationSchemas/userPaymentSchema';
import { paymentFormInputs } from '@/content/accountForms/paymentFormInputs';
import { cardExpirationDate } from '@/content/accountForms/cardExpirationDate';

import { TextInput } from '@/components/atoms';
import SelectInput from '@/components/atoms/SelectInput/SelectInput';
import { useCheckoutContext } from '@/context/checkoutContext';
import axiosInstance from '@/services/restaurantAPI';
import { ICreditCard } from '@/types/creditCard';
import CreditCardsList from '../CreditCardsList/CreditCardsList';

const Payment = () => {
  const { handlePaymentCardAdditing } = useCheckoutContext();
  const [creditCards, setCreditCards] = useState<ICreditCard[]>([]);
  console.log('🚀 : creditCards', creditCards);

  useEffect(() => {
    const getAllCreditCards = async () => {
      try {
        const { data } = await axiosInstance.get('/payments');
        setCreditCards(data);
      } catch (error) {
        console.error(error);
      }
    };
    getAllCreditCards();
  }, []);

  const formik = useFormik({
    initialValues: {
      addressTitle: '',
      cardNumber: '',
      cardHolder: '',
      cvvNumber: '',
      month: '',
      year: '',
    },
    validationSchema: paymentSchema,
    onSubmit: (values: FormikValues) => {
      // @ts-expect-error is necessary
      handlePaymentCardAdditing({ ...values });
    },
  });
  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className={styles.payment_address_form}>
        {paymentFormInputs.map((input, i) => (
          <div key={i} className={styles.payment_input_wrapper}>
            <label className={styles.payment_label}>{input.label}</label>
            <div className={styles.payment_input}>
              <TextInput {...input} formik={formik} />
            </div>
          </div>
        ))}
        <div className={styles.payment_input_wrapper}>
          <label className={styles.payment_select_wrapper} htmlFor="month">
            Expire date
          </label>
          <div className={styles.expiration_select_wrapper}>
            {cardExpirationDate.map((input) => (
              <span className={styles.expiration_select_input} key={input.name}>
                <SelectInput formik={formik} {...input} />
              </span>
            ))}
          </div>
        </div>
        <button type="submit" className={styles.add_payment_button}>
          Add payment card
        </button>
      </form>
      {creditCards.length > 0 && <CreditCardsList />}
    </>
  );
};

export default Payment;
