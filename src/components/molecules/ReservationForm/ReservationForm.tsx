import { useState } from 'react';
import { useFormik, FormikValues } from 'formik';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { add, format, setHours, setMinutes, startOfDay } from 'date-fns';
import CalendarInput from '../../atoms/CalendarInput/CalendarInput';
import TimePicker from '../../atoms/TimePicker/TimePicker';
import NumberInput from '../../atoms/NumberInput/NumberInput';
import styles from './ReservationForm.module.css';
import Button from '../../atoms/Button/Button';
import Swal from 'sweetalert2';
import { getValidationSchema } from '../../../validationSchemas/MainPageReservationFormSchema';

//Date options
const today = new Date();
let disablePast: boolean = true;
const currentTime = add(today, { minutes: 1 });
const startOfWorkingDay = setMinutes(setHours(startOfDay(new Date()), 8), 0);

const ReservationForm = () => {
  //Minimum time for vaidation logic
  const [minTime, setMinTime] = useState(today);

  const validationSchema = getValidationSchema(minTime);
  const formik = useFormik({
    initialValues: {
      date: today,
      time: currentTime,
      guests: 1,
    },
    validationSchema: validationSchema,
    onSubmit: ({ date, time, guests }: FormikValues) => {
      date = format(date, 'MM/dd/yyyy');
      time = format(time, 'HH:mm');

      //Modal confirmation
      Swal.fire({
        title: 'Confirmation',
        text: `You sure you want to reserve a table on this date: ${date}, time: ${time}, with this amount of guests: ${guests}`,
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirm!',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'Confirmed!',
            text: 'Thank you for your reservation! We are looking forward to see you!',
            icon: 'success',
          });
        }
      });
    },
  });

  const handleChange = (date: Date) => {
    const formattedSelectedDate = format(date, 'MM/dd/yyyy');
    const formattedCurrentDate = format(today, 'MM/dd/yyyy');
    if (formattedSelectedDate === formattedCurrentDate) {
      disablePast = true;
      setMinTime(add(today, { minutes: 1 })); //adding 1 minute to avoid error
    } else {
      disablePast = false;
      setMinTime(startOfWorkingDay);
    }
  };

  return (
    <div className={styles.reservationForm_container}>
      <form onSubmit={formik.handleSubmit} className={styles.reservationForm}>
        <h3>Make a reservation without a preorder</h3>
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
        <NumberInput formik={formik} name="guests" />
        <Button variant="contained" type="submit" isValid={!formik.isValid}>
          Reserve
        </Button>
      </form>
    </div>
  );
};

export default ReservationForm;