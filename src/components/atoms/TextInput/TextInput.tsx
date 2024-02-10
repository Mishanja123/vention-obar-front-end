import React, { ReactNode, useState, KeyboardEvent } from 'react';
import { BiShowAlt, BiHide } from 'react-icons/bi';

import { TextInputProps } from '@/types/textInputProps';

import styles from './TextInput.module.css';

const TextInput: React.FC<TextInputProps> = ({
  formik,
  name,
  placeholder,
  type,
  id,
  disabled,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const { handleChange, values, errors, touched } = formik;

  const isError = touched[name] && errors[name];

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      handleTogglePassword();
    }
  };

  return (
    <div className={styles.input_wrapper}>
      <input
        className={`${styles.text_input} ${isError ? styles.error_border : ''}`}
        type={showPassword ? 'text' : type}
        name={name}
        value={values[name]}
        onChange={handleChange}
        placeholder={placeholder}
        id={id}
        disabled={disabled}
      />
      {type === 'password' && (
        <div
          className={styles.password_button}
          role="button"
          tabIndex={0}
          onClick={handleTogglePassword}
          onKeyDown={handleKeyPress}>
          {showPassword ? <BiShowAlt /> : <BiHide />}
        </div>
      )}
      {touched[name] && errors[name] && (
        <p className={styles.error_message}>{errors[name] as ReactNode}</p>
      )}
    </div>
  );
};

export default TextInput;
