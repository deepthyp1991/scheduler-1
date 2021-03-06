import React, { useState, useEffect } from "react";
import axios from "axios";
import DayList from "./DayList";
import "components/Application.scss";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview } from "../helpers/selectors";



/*const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "3pm",
    interview: {
      student: "Mary Panterson",
      interviewer: {
        id: 2,
        name: "Tori Malcolm",
        avatar: "https://i.imgur.com/Nmx0Qxo.png" ,
      }
    }
  },
  {
    id: 4,
    time: "11am",
  },
  {
    id: 5,
    time: "2pm",
    interview: {
      student: "Emily Clair",
      interviewer: {
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  {
    id: 6,
    time: "4pm",
  }
  
];
*/

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  
  });

  const setDay = day => setState(prev => ({ ...prev, day }));
  const dailyAppointments = getAppointmentsForDay(state, state.day);;
  const AppointmentList = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);
    return(<Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
    />)});
 

  useEffect(() => {
    Promise.all([
        axios.get('/api/days'), 
        axios.get('/api/appointments'),
        axios.get('/api/interviewers')
      ]
    ).then(all => {//console.log('all',all, 'all[0]',all[0],'all[1]', all[1],'all[0].data', all[0].data,'all[1].data',all[1].data)
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })

  }, []);

 
  /*useEffect(()=> {axios.get("/api/days").then((response) => {
    //setDays([...response.data]);
  });},[])*/
  
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        <ul>{AppointmentList}</ul>
        
      </section>
    </main>
  );
}


