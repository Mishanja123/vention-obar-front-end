import React, { ReactNode } from 'react';
import styles from './TextInput.module.css';
import { TextInputProps } from '@/types/textInputProps';
// import { TextInputProps } from '../../../types/textInputProps';

const TextInput: React.FC<TextInputProps> = ({
  formik,
  name,
  placeholder,
  type,
  id,
}) => {
  const { handleChange, values, errors, touched } = formik;

  const isError = touched[name] && errors[name];

  return (
    <div>
      <input
        className={`${styles.text_input} ${isError ? styles.error_border : ''}`}
        type={type}
        name={name}
        value={values[name]}
        onChange={handleChange}
        placeholder={placeholder}
        id={id}
      />
      {touched[name] && errors[name] && (
        <p className={styles.error_message}>{errors[name] as ReactNode}</p>
      )}
    </div>
  );
};

export default TextInput;
