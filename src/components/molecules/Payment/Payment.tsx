import { useFormik, FormikValues } from 'formik';
import { useEffect, useState } from 'react';

import { paymentSchema } from '@/validationSchemas/userPaymentSchema';
import { paymentFormInputs } from '@/content/accountForms/paymentFormInputs';

import { useCheckoutContext } from '@/context/checkoutContext';
import axiosInstance from '@/services/restaurantAPI';
import { ICreditCard } from '@/types/creditCard';
import CreditCardsList from '../CreditCardsList/CreditCardsList';
import ReusableForm from '../ReuseableForm/ReuseableForm';
import styles from './Payment.module.css';
import { useLocation } from 'react-router-dom';
const Payment = () => {
  const { handlePaymentCardAdditing, setSelectedPaymentId } =
    useCheckoutContext();
  const [creditCards, setCreditCards] = useState<ICreditCard[]>([]);
  const location = useLocation();

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
    <section className="payment_section">
      <h2 className={styles.payment_cards_title}>Add payment card</h2>
      <ReusableForm
        initialValues={formik.initialValues}
        onSubmit={(values: ICreditCard) => {
          handlePaymentCardAdditing(values);
          setSelectedPaymentId(true);
        }}
        formInputs={paymentFormInputs}
        submitButtonLabel="Add payment card"
      />
      {creditCards.length > 0 && location.pathname === '/account/payment' && (
        <>
          <h2 className={styles.payment_cards_title}>Your credit cards</h2>
          <CreditCardsList />
        </>
      )}
    </section>
  );
};

export default Payment;
