import React from "react";
import { useFormik, FormikValues } from "formik";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import CalendarInput from "../../atoms/CalendarInput/CalendarInput";
import TimePicker from "../../atoms/TimePicker/TimePicker";
import NumberInput from "../../atoms/NumberInput/NumberInput";
import styles from "./ReservationForm.module.css";
import Button from "../../atoms/Button/Button";

const ReservationForm = () => {
  const formik = useFormik({
    initialValues: {
      date: Date.now(),
      time: Date.now(),
      guests: 0,
    },
    onSubmit: ({ date, time, guests }: FormikValues) => {
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
