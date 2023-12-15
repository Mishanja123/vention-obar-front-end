import { FormikValues } from 'formik';
import styles from './NumberInput.module.css';
import { PeopleAltIcon } from '../../../assets/icons';

type NumberInputProps = {
  formik: {
    values: FormikValues;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
  id: string;
  name: string;
  min: number;
  max?: number;
};

const NumberInput = ({ formik, id, name, min, max }: NumberInputProps) => {
  return (
    <div className={styles.numberInput}>
      <input
        type="number"
        id={id}
        name={name}
        value={formik.values[name] || 0}
        onChange={formik.handleChange}
        min={min}
        max={max}
      />
      <PeopleAltIcon />
    </div>
  );
};

export default NumberInput;
