import { useMemo, useState } from 'react';
import { DatePicker, DateValidationError } from '@mui/x-date-pickers';
import { FormikHelpers, FormikValues } from 'formik';

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
  const [error, setError] = useState<DateValidationError | null>(null);

  const errorMessage = useMemo(() => {
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

  const handleChange = (newDate: Date | null) => {
    formik.setFieldValue(fieldName, newDate || undefined);
    if (onChange) {
      onChange(newDate as Date);
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
