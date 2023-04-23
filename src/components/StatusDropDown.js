import React, { useEffect, useState } from "react";
import { updateCustomerOnServer } from "../server-requests";
import LoadingScreen from "./LoadingScreen";
import CallLaterPopUp from "./CallLaterPopUp";

const StatusDropdown = ({ customer, status, handleStatusUpdate, setSchedules }) => {

  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [callLater, setCallLater] = useState(false);
  const [loading, setLoading] = useState(false);


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

  return (
    <div className="menu-container">

      {loading ? <LoadingScreen /> : null}

      {callLater ? (
        <CallLaterPopUp setLoading={setLoading} customer={customer} handleStatusUpdate={handleStatusUpdate} setCallLater={setCallLater} setSchedules={setSchedules} />
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