import React, { useState } from "react";
import { addScheduleToServer, getCustomerScheduleFromServer, updateCustomerOnServer, updateScheduleOnServer } from "../server-requests";

const CallLaterPopUp = ({ setLoading, customer, handleStatusUpdate, setCallLater, setSchedules, schedule, edit=false }) => {

  const customerUrl = `https://${window.location.hostname}/customers/${customer.id}`;
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const updateDate = (e) => {
    const formattedDate = new Date(e.target.value).toLocaleString(undefined, {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23'
    }).split(',')[0];
    setDate(formattedDate);
  }

  const updateTime = (e) => {
    setTime(e.target.value);
  }

  const SubmitDate = async (e) => {
    e.preventDefault();

    // validation
    if(date === '' || time === '') {
      alert('Please select a date and time');
      return;
    }

    const chosenDate = new Date(`${date} ${time}`);
    const now = new Date();

    if(chosenDate < now) {
      alert('Please select a date and time in the future');
      return;
    }

    setLoading(true);
    if (!edit) {
      await updateCustomerOnServer(customer, customer.id, customer.name, customer.email, customer.phone, 'Call later');
      handleStatusUpdate('Call later');
      await addScheduleToServer(customerUrl, date, time, customer.name, customer.id)
    } else {
      await updateScheduleOnServer(schedule.id, date, time)
    }
    
    const newSchedule = await getCustomerScheduleFromServer(customer.id);
    setSchedules(newSchedule);
    setCallLater(false);
    setLoading(false);
  }

  return (
    <div className="call-later">
      <form>
        <input type="date" onChange={updateDate} defaultValue={date} />
        <input type="time" onInput={updateTime} defaultValue={time} />
        <button className="btn success" type="submit" onClick={SubmitDate}>Submit</button>
        <button className="btn danger" onClick={() => setCallLater(false)}>Cancel</button>
      </form>
    </div>
  )
}

export default CallLaterPopUp;