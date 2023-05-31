import moment from 'moment';
import { appointments } from './appointments';


const currentDate = moment();
// console.log('currentTime :', currentDate)
let date = currentDate.date();
// console.log('currentDate.date() :', date)

const makeTodayAppointment = (startDate, endDate) => {
  console.log("startDate : ", startDate)
  console.log("endtDate : ", endDate)
  const days = moment(startDate).diff(endDate, 'days');
  // console.log('days diff : ', days)
  const nextStartDate = moment(startDate)
    .year(moment(startDate).year())
    .month(moment(startDate).month())
    .date(moment(startDate).date());
    // .year(currentDate.year())
    // .month(currentDate.month())
    // .date(date);
    console.log("nextStartDate Type", typeof(nextStartDate))  
    console.log("nextStartDate : ", nextStartDate.toDate())
  const nextEndDate = moment(endDate)
    .year(moment(endDate).year())
    .month(moment(endDate).month())
    .date(moment(endDate).date()+days);
    // .year(currentDate.year())
    // .month(currentDate.month())
    // .date(date + days);
  console.log("nextEndDate Type", typeof(nextEndDate))  
  console.log("nextEndDate : ", nextEndDate.toDate())

  return {
    startDate: nextStartDate.toDate(),
    endDate: nextEndDate.toDate(),
  };
};


// const result_export = appointments.map(({ startDate, endDate, ...restArgs }) => {
//     const result = {
//       ...makeTodayAppointment(startDate, endDate),
//       ...restArgs,
//     };
//     date += 1;
//     if (date > 31) date = 1;
//     return result;
//   })

// export default result_export;

export default appointments.map(({ startDate, endDate, ...restArgs }) => {
  const result = {
    ...makeTodayAppointment(startDate, endDate),
    ...restArgs,
  };
  date += 1;
  if (date > 31) date = 1;
  return result;
});
