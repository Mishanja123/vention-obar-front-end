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
import { useLocation, useNavigate } from 'react-router-dom';
import { useCheckoutContext } from '@/context/checkoutContext';
import { PATHS } from '@/constants/paths';

const today = new Date();
let disablePast: boolean = true;
const currentTime = add(today, { minutes: 1 });
const startOfWorkingDay = setMinutes(setHours(startOfDay(new Date()), 8), 0);

const ReservationForm = () => {
  const [minTime, setMinTime] = useState(today);
  const location = useLocation();
  const navigate = useNavigate();

  const { sendReservation } = useCheckoutContext();
  const withPreorder = location.pathname === '/checkout/booktable';
  const validationSchema = getValidationSchema(minTime);
  const formik = useFormik({
    initialValues: {
      date: today,
      time: currentTime,
      guests: 1,
    },
    validationSchema: validationSchema,
    onSubmit: async ({ date, time, guests }: FormikValues) => {
      date = format(date, 'MM/dd/yyyy');
      time = format(time, 'HH:mm');
      Swal.fire({
        title: 'Confirmation',
        text: `Are you sure you want to reserve a table on this date: ${date}, time: ${time}, with ${guests} guests?`,
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#182715',
        cancelButtonColor: '#182715',
        confirmButtonText: 'Confirm!',
        customClass: {
          popup: styles.confirmation_modal,
        },
      }).then((result) => {
        if (result.isConfirmed) {
          if (withPreorder) {
            try {
              sendReservation(date, time, guests, withPreorder);
              Swal.fire({
                title: 'Confirmed!',
                text: 'Thank you for your reservation! We look forward to seeing you!',
                icon: 'success',
                confirmButtonColor: '#182715',
                customClass: {
                  popup: styles.confirmation_modal,
                },
              });
              navigate(`${PATHS.CHECKOUT}/${PATHS.ORDER_CONFIRMATION}`);
            } catch (error) {
              console.error('Error sending reservation:', error);
              Swal.fire({
                title: 'Error',
                text: 'An error occurred while processing your reservation. Please try again.',
                icon: 'error',
              });
            }
          }
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
    <div className={styles.reservationForm_container}>
      <form onSubmit={formik.handleSubmit} className={styles.reservationForm}>
        <h3 className={styles.reservation_form_title}>
          Make a reservation{' '}
          {location.pathname === '/checkout/booktable'
            ? 'with a preorder'
            : 'without a preorder'}
        </h3>
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
