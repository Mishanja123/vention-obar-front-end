import { FormikValues, FormikErrors, FormikTouched } from 'formik';

export type TextInputProps = {
  formik: {
    values: FormikValues;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    errors: FormikErrors<FormikValues>;
    touched: FormikTouched<FormikValues>;
  };
  name: string;
  placeholder: string;
  type: string;
  id: string;
  disabled?: boolean;
};
