import { DatePicker } from "@mui/x-date-pickers";
import { FormikHelpers, FormikValues } from "formik";

type CalendarInputProps = {
  formik: {
    values: FormikValues;
    setFieldValue: FormikHelpers<FormikValues>["setFieldValue"];
  };
  fieldName: string;
};

const CalendarInput = ({ formik, fieldName }: CalendarInputProps) => {
  return (
    <>
      <DatePicker
        value={formik.values.date}
        onChange={(newDate) => formik.setFieldValue(fieldName, newDate)}
        disablePast
      />
    </>
  );
};

export default CalendarInput;
