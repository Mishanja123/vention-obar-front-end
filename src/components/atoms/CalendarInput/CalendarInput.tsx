/* eslint-disable react/jsx-filename-extension */
import { DatePicker, DateValidationError } from '@mui/x-date-pickers';
import { FormikHelpers, FormikValues } from 'formik';

import React from 'react';

interface CalendarInputProps {
  formik: {
    values: FormikValues;
    setFieldValue: FormikHelpers<FormikValues>['setFieldValue'];
  };
  fieldName: string;
  onChange?: (newDate: Date) => void;
}

const oneMonthLater: Date = new Date();
oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);

const CalendarInput = ({ formik, fieldName, onChange }: CalendarInputProps) => {
  const [error, setError] = React.useState<DateValidationError | null>(null);

  const errorMessage = React.useMemo(() => {
    switch (error) {
      case 'maxDate': {
        return "Please select a date within a month after today's date";
      }
      case 'disablePast':
      case 'minDate': {
        return 'Please select date in the following month, not the past one ;)';
      }

      case 'invalidDate': {
        return 'Your date is not valid';
      }

      default: {
        return '';
      }
    }
  }, [error]);

  const handleChange = (newDate: Date) => {
    formik.setFieldValue(fieldName, newDate);
    if (onChange) {
      onChange(newDate);
    }
  };

  return (
    <DatePicker
      defaultValue={formik.values.date}
      onChange={handleChange}
      disablePast
      maxDate={oneMonthLater}
      onError={(newError) => setError(newError)}
      slotProps={{
        textField: {
          helperText: errorMessage,
        },
      }}
    />
  );
};

export default CalendarInput;
