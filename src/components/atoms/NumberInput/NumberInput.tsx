import { FormikValues } from 'formik';
import styles from './NumberInput.module.css';
import Icon from '../Icon/Icon';

interface NumberInputProps {
  formik: {
    values: FormikValues;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
  name: string;
  min: number;
  max?: number;
}

const NumberInput = ({ formik, name, min, max }: NumberInputProps) => {
  return (
    <div className={styles.numberInput}>
      <input
        type="number"
        name={name}
        value={formik.values[name] || 0}
        onChange={formik.handleChange}
        min={min}
        max={max}
      />
      <Icon iconName="people" />
    </div>
  );
};

export default NumberInput;
