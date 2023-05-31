import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  Toolbar,
  MonthView,
  WeekView,
  ViewSwitcher,
  Appointments,
  AppointmentTooltip,
  AppointmentForm,
  DragDropProvider,
  EditRecurrenceMenu,
  AllDayPanel,
  DateNavigator,
  TodayButton
} from '@devexpress/dx-react-scheduler-material-ui';
import { connectProps } from '@devexpress/dx-react-core';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import LocationOn from '@mui/icons-material/LocationOn';
import Notes from '@mui/icons-material/Notes';
import Close from '@mui/icons-material/Close';
import CalendarToday from '@mui/icons-material/CalendarToday';
import Create from '@mui/icons-material/Create';

// import  result_export  from './demo-data/today_appointment';
import { Schedule } from '@mui/icons-material';
// import  appointments  from './demo-data/today_appointment';
// import  {appointments}  from './demo-data/appointments';

import moment from 'moment';


// const ScheduleCard = ({dateStart, dateEnd}) =>{
//   const [currentDate, setCurrentDate ] = useState(dateStart)
//   const [currentView, setCurrentView] = useState('Week')


//   // const attr = {
//   //   data: appointments,
//   //   currentDate: new Date(),
//   //   currentView: "Week",
//   //   range: this.getRange(new Date(), "Week")
//   // };
//   console.log(6666666666)

//   // setCurrentDate(dateStart)
//   useEffect(()=>{
//     console.log('currentDate : ', currentDate)
//     console.log("Use Effect")
//   },[currentDate])

//   console.log('CurrentDateStart in the function', dateStart)
//   // console.log('CurrentDate in the function', currentDate)

//   const getRange = (date, view) => {
//     if (view === "Day") {
//       return { startDate: date, endDate: date };
//     }
//     if (view === "Week") {
//       let firstDay = date.getDate() - date.getDay();
//       let lastDay = firstDay + 6;
//       return {
//         startDate: new Date(date.setDate(firstDay)),
//         endDate: new Date(date.setDate(lastDay))
//       };
//     }
//   };

//   const [range, setRange] = useState(getRange(new Date(), "Week"))
//   console.log('range', range)

//   const currentDateChange = currentDate => {
//     console.log('currentDate in change', currentDate);
//     let weekRange = getRange(currentDate, currentView);
//     setRange(weekRange)
//     setCurrentDate(currentDate)
//   };

//   return(
//     <Paper>
//     <Scheduler data={result_export} height={660}>
//       <ViewState
//         defaultCurrentDate={dateStart}
//         currentDate={dateStart}
//         currentView={currentView}
//         onCurrentDateChange={()=>currentDateChange(dateStart)}
//         // onCurrentViewNameChange={currentViewChange}
//       />
//       <WeekView startDayHour={9} endDayHour={19} />
//       <Appointments />
//     </Scheduler>
//     {console.log(1234567812345678)}
//     </Paper>
//   )
// };


class ScheduleCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.detail,
      currentDate: new Date(),
      currentView: "Week",
      range: this.getRange(new Date(), "Week"),
    };
  }
  render() {
    const { data, currentDate, currentView, range } = this.state;
    const curDate = moment();
// console.log('currentTime :', currentDate)
    let date = curDate.date();
    const makeTodayAppointment = (startDate, endDate) => {
      // console.log("startDate : ", startDate)
      // console.log("endtDate : ", endDate)
      const days = moment(startDate).diff(endDate, 'days');
      // console.log('days diff : ', days)
      const nextStartDate = moment(startDate)
        .year(moment(startDate).year())
        .month(moment(startDate).month())
        .date(moment(startDate).date());
        // .year(currentDate.year())
        // .month(currentDate.month())
        // .date(date);
        // console.log("nextStartDate Type", typeof(nextStartDate))  
        // console.log("nextStartDate : ", nextStartDate.toDate())
      const nextEndDate = moment(endDate)
        .year(moment(endDate).year())
        .month(moment(endDate).month())
        .date(moment(endDate).date()+days);
        // .year(currentDate.year())
        // .month(currentDate.month())
        // .date(date + days);
      // console.log("nextEndDate Type", typeof(nextEndDate))  
      // console.log("nextEndDate : ", nextEndDate.toDate())
    
      return {
        startDate: nextStartDate.toDate(),
        endDate: nextEndDate.toDate(),
      };
    };

    const handledData = data.map(({ startDate, endDate, ...restArgs }) => {
      const result = {
        ...makeTodayAppointment(startDate, endDate),
        ...restArgs,
      };
      date += 1;
      if (date > 31) date = 1;
      return result;
    });

    return (
        <Paper>
          {/* <div>{`這禮拜開始於： ${range.startDate.toString("yyyy-MM-dd")} `}</div>
          <div>{`這禮拜結束於： ${range.endDate.toString("yyyy-MM-dd")} `}</div> */}
          <Scheduler height={500} data={handledData} >
            <ViewState
              currentDate={currentDate}
              currentView={currentView}
              onCurrentDateChange={this.currentDateChange}
              onCurrentViewNameChange={this.currentViewChange}
            />
            <WeekView startDayHour={9} endDayHour={19} name="Week" />
            <Appointments />
            <Toolbar />
            <DateNavigator />
            <TodayButton />
            {/* <button onClick={() => console.log(this.props.dateStart)}>Click me</button> */}
            </Scheduler>
        </Paper>
    );
  }
  getRange = (date, view) => {
    if (view === "Day") {
      return { startDate: date, endDate: date };
    }
    if (view === "Week") {
      let firstDay = date.getDate() - date.getDay();
      let lastDay = firstDay + 6;
      return {
        startDate: new Date(date.setDate(firstDay)),
        endDate: new Date(date.setDate(lastDay))
      };
    }
  };
  currentViewChange = currentView => {
    let currentDate = this.state.currentDate;
    let range = this.getRange(currentDate, currentView);
    this.setState({
      currentView,
      range
    });
  };
  currentDateChange = currentDate => {
    // console.log(currentDate);
    let currentView = this.state.currentView;
    let range = this.getRange(currentDate, currentView);
    this.setState({
      currentDate,
      range
    });
  };

  
}



export default ScheduleCard

