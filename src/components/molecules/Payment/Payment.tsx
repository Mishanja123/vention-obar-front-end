import { useFormik, FormikValues } from 'formik';
import { useEffect, useState } from 'react';

// import styles from './Payment.module.css';

import { paymentSchema } from '@/validationSchemas/userPaymentSchema';
import { paymentFormInputs } from '@/content/accountForms/paymentFormInputs';
// import { cardExpirationDate } from '@/content/accountForms/cardExpirationDate';

// import { TextInput } from '@/components/atoms';
// import SelectInput from '@/components/atoms/SelectInput/SelectInput';
import { useCheckoutContext } from '@/context/checkoutContext';
import axiosInstance from '@/services/restaurantAPI';
import { ICreditCard } from '@/types/creditCard';
import CreditCardsList from '../CreditCardsList/CreditCardsList';
import ReusableForm from '../ReuseableForm/ReuseableForm';

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
      <ReusableForm
        initialValues={formik.initialValues}
        onSubmit={formik.handleSubmit}
        formInputs={paymentFormInputs}
        submitButtonLabel="Add payment card"
      />
      {creditCards.length > 0 && <CreditCardsList />}
    </>
  );
};

export default Payment;