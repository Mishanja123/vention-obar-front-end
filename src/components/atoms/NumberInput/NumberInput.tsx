import { FormikErrors, FormikTouched, FormikValues } from 'formik';
import styles from './NumberInput.module.css';
import Icon from '../Icon/Icon';

interface NumberInputProps {
  formik: {
    values: FormikValues;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
    errors: FormikErrors<{ guests: number }>;
    touched: FormikTouched<FormikValues>; // Change the type to FormikTouched<FormikValues>
  };
  name: keyof FormikErrors<{ guests: number }>;
}

const NumberInput = ({ formik, name }: NumberInputProps) => {
  const hasError = formik.touched[name] && formik.errors[name];
  return (
    <div className={styles.inputContainer}>
      <div className={hasError ? styles.errorInput : styles.numberInput}>
        <input
          type="number"
          name={name}
          value={formik.values[name] || 0}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <Icon iconName="people" />
      </div>
      {hasError && (
        <div className={styles.errorText}>{formik.errors[name]}</div>
      )}
    </div>
  );
};

export default NumberInput;
