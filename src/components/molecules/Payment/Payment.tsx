import { useFormik, FormikValues } from 'formik';

import styles from './Payment.module.css';

import { paymentSchema } from '@/validationSchemas/userPaymentSchema';
import { paymentFormInputs } from '@/content/accountForms/paymentFormInputs';
import { cardExpirationDate } from '@/content/accountForms/cardExpirationDate';

import { TextInput } from '@/components/atoms';
import SelectInput from '@/components/atoms/SelectInput/SelectInput';

const Payment = () => {
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
      console.log(addressTitle, cardNumber, cardholder, cvvNumber, month, year);
    },
  });
  return (
    <div>
      <button className={styles.add_payment_button}>Add payment card</button>
      <form
        onSubmit={formik.handleSubmit}
        className={styles.delivery_address_form}>
        {paymentFormInputs.map((input, i) => (
          <div key={i} className={styles.payment_input_wrapper}>
            <label>{input.label}</label>
            <TextInput {...input} formik={formik} />
          </div>
        ))}
        <div className={styles.payment_input_wrapper}>
          <label className={styles.payment_select_wrapper} htmlFor="month">
            Expire date
          </label>
          <div className={styles.expiration_select_wrapper}>
            {cardExpirationDate.map((input) => (
              <SelectInput formik={formik} {...input} key={input.name} />
            ))}
          </div>
        </div>
        <button type="submit" className={styles.add_payment_button}>
          Edit / Save changes
        </button>
      </form>
    </div>
  );
};

export default Payment;
