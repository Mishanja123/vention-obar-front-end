import {
  DateValidationError,
  TimePicker as MUITimePicker,
  TimeValidationError,
} from '@mui/x-date-pickers';
import { add, setHours, setMinutes, startOfDay, sub } from 'date-fns';
import { FormikValues, FormikHelpers } from 'formik';
import React from 'react';

interface TimePickerProps {
  formik: {
    values: FormikValues;
    setFieldValue: FormikHelpers<FormikValues>['setFieldValue'];
  };
  fieldName: string;
  initialValue: Date;
  pastEnabled: boolean;
}

const startOfWorkingDay = setMinutes(setHours(startOfDay(new Date()), 8), 0);
const endOfWorkingDay = setMinutes(setHours(startOfDay(new Date()), 23), 0);
const hourBeforeClosing = sub(endOfWorkingDay, { hours: 1 });

const TimePicker = ({
  formik,
  fieldName,
  initialValue,
  pastEnabled,
}: TimePickerProps) => {
  const [error, setError] = React.useState<TimeValidationError | null>(null);

  const errorMessage = React.useMemo(() => {
    switch (error) {
      case 'disablePast': {
        return 'Please select a date in between our working hours';
      }
      case 'minTime': {
        return 'Please select a date in between our working hours';
      }
      case 'maxTime': {
        return 'Please select a date in between our working hours';
      }

      default: {
        return '';
      }
    }
  }, [error]);

  return (
    <>
      <MUITimePicker
        ampm={false}
        defaultValue={initialValue}
        onChange={(newTime) => formik.setFieldValue(fieldName, newTime)}
        minTime={startOfWorkingDay}
        maxTime={hourBeforeClosing}
        disablePast={pastEnabled}
        onError={(newError) => setError(newError)}
        slotProps={{
          textField: {
            helperText: errorMessage,
          },
        }}
      />
    </>
  );
};

export default TimePicker;
