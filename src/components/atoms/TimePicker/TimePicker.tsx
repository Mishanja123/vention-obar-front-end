import { TimePicker as MUITimePicker } from "@mui/x-date-pickers";
import { add } from "date-fns";
import { FormikValues, FormikHelpers } from "formik";

type TimePickerProps = {
  formik: {
    values: FormikValues;
    setFieldValue: FormikHelpers<FormikValues>["setFieldValue"];
  };
  fieldName: string;
};

const TimePicker = ({ formik, fieldName }: TimePickerProps) => {
  const today = new Date();
  const todayHourFromNow = add(today, { hours: 1 });
  return (
    <>
      <MUITimePicker
        ampm={false}
        defaultValue={todayHourFromNow}
        disablePast
        onChange={(newTime) => formik.setFieldValue(fieldName, newTime)}
      />
    </>
  );
};

export default TimePicker;
