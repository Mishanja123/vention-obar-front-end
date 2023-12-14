import React from "react";
import { useFormik, FormikValues } from "formik";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import CalendarInput from "../../atoms/CalendarInput/CalendarInput";
import TimePicker from "../../atoms/TimePicker/TimePicker";
import NumberInput from "../../atoms/NumberInput/NumberInput";
import styles from "./ReservationForm.module.css";
import Button from "../../atoms/Button/Button";
import { add, format } from "date-fns";
// import * as yup from "yup";

// const validationSchema = yup.object({
//   date: yup.date().required("Date is required"),
//   time: yup.date().required("Time is required"),
//   guests: yup
//     .number()
//     .integer("Guests must be the whole number")
//     .min(1, "There must be at least one guest"),
// });

const ReservationForm = () => {
  const today = new Date();
  const todayHourFromNow = add(today, { hours: 1 });

  const formik = useFormik({
    initialValues: {
      date: today,
      time: todayHourFromNow,
      guests: 0,
    },
    // validationSchema: validationSchema,
    onSubmit: ({ date, time, guests }: FormikValues) => {
      date = format(date, "MM/dd/yyyy");
      time = format(time, "HH:mm");

      console.log(date, time, guests);
    },
  });
  return (
    <div className={styles.reservationForm_container}>
      <form onSubmit={formik.handleSubmit} className={styles.reservationForm}>
        <h3>Make a reservation without a preorder</h3>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CalendarInput formik={formik} fieldName="date" />
          <TimePicker formik={formik} fieldName="time" />
        </LocalizationProvider>
        <NumberInput formik={formik} id="guests" name="guests" />
        <Button variant="contained" type="submit">
          Reserve
        </Button>
      </form>
    </div>
  );
};

export default ReservationForm;
