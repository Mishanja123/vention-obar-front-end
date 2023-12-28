import { setHours, setMinutes, startOfDay, sub } from 'date-fns';
import * as yup from 'yup';

const today = new Date();
const oneMonthLater: Date = new Date();
oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);
const startofTheDay = startOfDay(today);
const endOfWorkingDay = setMinutes(setHours(startOfDay(new Date()), 23), 0);
const hourBeforeClosing = sub(endOfWorkingDay, { hours: 1 });

export const getValidationSchema = (minTime: Date) => {
  return yup.object({
    date: yup
      .date()
      .required('Date is required')
      .min(startofTheDay, 'Selected date must be today or a future date')
      .max(oneMonthLater, 'Select date within next month'),
    time: yup
      .date()
      .required('Time is required')
      .min(minTime, 'Select following time, not the past!')
      .max(hourBeforeClosing, 'Select time within working hours'),
  });
};
