import { useFormik, FormikValues } from 'formik';

import styles from './Payment.module.css';

import { paymentSchema } from '@/validationSchemas/userPaymentSchema';
import { paymentFormInputs } from '@/content/accountForms/paymentFormInputs';
import { cardExpirationDate } from '@/content/accountForms/cardExpirationDate';

import { TextInput } from '@/components/atoms';
import SelectInput from '@/components/atoms/SelectInput/SelectInput';
import { useCheckoutContext } from '@/context/checkoutContext';

const Payment = () => {
  const { handlePaymentCardAdditing } = useCheckoutContext();

  const formik = useFormik({
    initialValues: {
      addressTitle: '',
      cardNumber: '',
      cardholder: '',
      cvvNumber: '',
      month: '',
      year: '',
    },
    validationSchema: paymentSchema,
    onSubmit: ({
      addressTitle,
      cardNumber,
      cardholder,
      cvvNumber,
      month,
      year,
    }: FormikValues) => {
      handlePaymentCardAdditing(
        addressTitle,
        cardNumber,
        cardholder,
        cvvNumber,
        month,
        year,
      );
      console.log(addressTitle, cardNumber, cardholder, cvvNumber, month, year);
    },
  });
  return (
    <form
      onSubmit={formik.handleSubmit}
      className={styles.payment_address_form}>
      <button className={styles.add_payment_button}>Add payment card</button>
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
        Edit / Save changes
      </button>
    </form>
  );
};

export default Payment;
