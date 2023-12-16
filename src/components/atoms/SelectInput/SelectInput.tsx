import { ReactNode } from 'react';
import styles from './SelectInput.module.css';
import { SelectInputProps } from '@/types/selectInputProps';
// import { SelectInputProps } from '../../../types/selectInputProps';

const SelectInput: React.FC<SelectInputProps> = ({
  formik,
  name,
  placeholder,
  id,
  options,
}) => {
  const { handleChange, values, errors, touched } = formik;

  const isError = touched[name] && errors[name];

  return (
    <div>
      <select
        className={`${styles.select_input} ${
          isError ? styles.error_border : ''
        }`}
        name={name}
        value={values[name]}
        onChange={handleChange}
        id={id}
      >
        <option value="" label={placeholder} disabled />
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {touched[name] && errors[name] && (
        <p className={styles.error_message}>{errors[name] as ReactNode}</p>
      )}
    </div>
  );
};

export default SelectInput;
