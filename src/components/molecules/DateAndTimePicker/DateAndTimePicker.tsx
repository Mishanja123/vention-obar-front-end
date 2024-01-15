import { useState } from 'react';
import { useFormik, FormikValues } from 'formik';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { add, format, setHours, setMinutes, startOfDay } from 'date-fns';
import { Button, CalendarInput } from '@/components/atoms';
import Swal from 'sweetalert2';
import { getValidationSchema } from '@/validationSchemas/dateAndTimePickerSchema';
import styles from './DateAndTimePicker.module.css';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/constants/paths';
import { TimePicker } from '@/components/atoms';
import { useCheckoutContext } from '@/context/checkoutContext';

const today = new Date();
let disablePast: boolean = true;
const currentTime = add(today, { minutes: 1 });
const startOfWorkingDay = setMinutes(setHours(startOfDay(new Date()), 8), 0);

const DateAndTimePicker = () => {
  const navigate = useNavigate();
  const [minTime, setMinTime] = useState(today);
  const { sendDeliveryOrTakeOut } = useCheckoutContext();

  const validationSchema = getValidationSchema(minTime);
  const formik = useFormik({
    initialValues: {
      date: today,
      time: currentTime,
    },
    validationSchema: validationSchema,
    onSubmit: ({ date, time }: FormikValues) => {
      date = format(date, 'MM/dd/yyyy');
      time = format(time, 'HH:mm');

      //Modal confirmation
      Swal.fire({
        title: 'Check your reservation',
        text: `Date: ${date}, Time: ${time}. Move on to confirmation process?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#182715',
        cancelButtonColor: '#182715',
        confirmButtonText: 'Yes',
        customClass: {
          popup: styles.confirmation_modal,
        },
      }).then((result) => {
        if (result.isConfirmed) {
          sendDeliveryOrTakeOut(date, time);
          navigate(`${PATHS.CHECKOUT}/${PATHS.ORDER_CONFIRMATION}`);
        }
      });
    },
  });

  const handleChange = (date: Date) => {
    const formattedSelectedDate = format(date, 'MM/dd/yyyy');
    const formattedCurrentDate = format(today, 'MM/dd/yyyy');
    if (formattedSelectedDate === formattedCurrentDate) {
      disablePast = true;
      setMinTime(add(today, { minutes: 1 }));
    } else {
      disablePast = false;
      setMinTime(startOfWorkingDay);
    }
  };

  return (
    <div className={styles.dateAndTime_container}>
      <form onSubmit={formik.handleSubmit} className={styles.dateAndTime_form}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CalendarInput
            formik={formik}
            fieldName="date"
            onChange={handleChange}
          />
          <TimePicker
            formik={formik}
            fieldName="time"
            initialValue={formik.values.time}
            pastEnabled={disablePast}
          />
        </LocalizationProvider>
        <Button variant="contained" type="submit" isValid={!formik.isValid}>
          Reserve
        </Button>
      </form>
    </div>
  );
};

export default DateAndTimePicker;
