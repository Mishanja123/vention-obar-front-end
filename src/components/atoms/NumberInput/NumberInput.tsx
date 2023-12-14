import { FormikValues } from "formik";
import styles from "./NumberInput.module.css";
import { PeopleAltIcon } from "../../../assets/icons";

type NumberInputProps = {
  formik: {
    values: FormikValues;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
  id: string;
  name: string;
  max?: number;
};

const NumberInput = ({ formik, id, name, max }: NumberInputProps) => {
  return (
    <div className={styles.numberInput}>
      <input
        type="number"
        id={id}
        name={name}
        value={formik.values[name] || 0}
        onChange={formik.handleChange}
        max={max}
      />
      <PeopleAltIcon />
    </div>
  );
};

export default NumberInput;
