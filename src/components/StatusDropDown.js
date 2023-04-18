import React, { useState } from "react";
import { updateCustomerOnServer } from "../server-requests";
import LoadingScreen from "./LoadingScreen";

const StatusDropdown = ({ customer, status, handleStatusUpdate }) => {

  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [loading, setLoading] = useState(false);


  const toggleDropDown = () => {
    setDropDownOpen(!dropDownOpen);
  }

  const updateStatus = async (e) => {
    setDropDownOpen(false);
    setLoading(true);
    await updateCustomerOnServer(customer, customer.id, customer.name, customer.email, customer.phone, e.target.innerText);
    handleStatusUpdate(e.target.innerText);
    setLoading(false);
  }

  return (
    <div className="menu-container">

      {loading ? <LoadingScreen /> : null}

      <div className="menu-trigger" onClick={toggleDropDown}>
        <p>{status}</p>
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