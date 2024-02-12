//@ts-nocheck

import { useFormik } from 'formik';
import { TextInput } from '@/components/atoms';
import SelectInput from '@/components/atoms/SelectInput/SelectInput';
import { cardExpirationDate } from '@/content/accountForms/cardExpirationDate';
import styles from './ReuseableForm.module.css';
import { paymentSchema } from '@/validationSchemas/userPaymentSchema';

const ReusableForm = ({
  initialValues,
  onSubmit,
  formInputs,
  submitButtonLabel,
}) => {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: paymentSchema,
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className={styles.payment_address_form}>
      {formInputs.map((input, index) => (
        <div key={index} className={styles.payment_input_wrapper}>
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
          {cardExpirationDate.map((input, index) => (
            <span className={styles.expiration_select_input} key={index}>
              <SelectInput formik={formik} {...input} />
            </span>
          ))}
        </div>
      </div>
      <button type="submit" className={styles.add_payment_button}>
        {submitButtonLabel}
      </button>
    </form>
  );
};

export default ReusableForm;
