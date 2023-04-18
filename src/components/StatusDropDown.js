import React, { useEffect, useState } from "react";
import { addScheduleToServer, updateCustomerOnServer } from "../server-requests";
import LoadingScreen from "./LoadingScreen";

const StatusDropdown = ({ customer, status, handleStatusUpdate }) => {

  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [callLater, setCallLater] = useState(false);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');


  const toggleDropDown = () => {
    setDropDownOpen(!dropDownOpen);
  }

  useEffect(() => {
    const closeDropDown = (e) => {
      if(e.target?.attributes?.[0]?.name !== 'data-dropdown' && e.target.className !== 'dropdown-item') {
        setDropDownOpen(false);
      }
    }

    window.addEventListener('click', closeDropDown);

    return () => {
      window.removeEventListener('click', closeDropDown);
    }
  })

  const updateStatus = async (e) => {
    if(e.target.innerText === 'Call later') {
      setCallLater(true);
      setDropDownOpen(false);
      return;
    }


    setDropDownOpen(false);
    setLoading(true);
    await updateCustomerOnServer(customer, customer.id, customer.name, customer.email, customer.phone, e.target.innerText);
    handleStatusUpdate(e.target.innerText);
    setLoading(false);
  }

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
    await updateCustomerOnServer(customer, customer.id, customer.name, customer.email, customer.phone, 'Call later');
    handleStatusUpdate('Call later');
    addScheduleToServer(customer.name, customer.phone, date, time)
    setCallLater(false);
    setLoading(false);
  }

  return (
    <div className="menu-container">

      {loading ? <LoadingScreen /> : null}

      {callLater ? (
        <div className="call-later">
          <form>
            <input type="date" onChange={updateDate} />
            <input type="time" onInput={updateTime} />
            <button className="btn success" type="submit" onClick={SubmitDate}>Submit</button>
            <button className="btn danger" onClick={() => setCallLater(false)}>Cancel</button>
          </form>
        </div>
      ) : null}

      <div className="menu-trigger" onClick={toggleDropDown}>
        <p data-dropdown>{status}</p>
      </div>

      {dropDownOpen ? (
        <div className="dropdown-menu">
          <ul>
            <li className="dropdown-item" onClick={updateStatus}>
              Call later
            </li>
            <li className="dropdown-item" onClick={updateStatus}>
              Not interested
            </li>
            <li className="dropdown-item" onClick={updateStatus}>
              Unreachable
            </li>
            <li className="dropdown-item" onClick={updateStatus}>
              Closed deal
            </li>
          </ul>
        </div>
      ) : null}
  </div>
  )
}

export default StatusDropdown;