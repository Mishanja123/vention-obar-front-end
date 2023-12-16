import { FormikValues, FormikErrors, FormikTouched } from 'formik';

type SelectInputOptions = {
  value: string;
  label: string;
};

export type SelectInputProps = {
  formik: {
    values: FormikValues;
    handleChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => void;
    errors: FormikErrors<FormikValues>;
    touched: FormikTouched<FormikValues>;
  };
  name: string;
  placeholder: string;
  type: string;
  id: string;
  options: SelectInputOptions[];
};
