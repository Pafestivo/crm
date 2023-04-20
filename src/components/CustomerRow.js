import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getCustomer } from "../server-requests";
import '../styles/customer-row.css';
import '../styles/dropdown.css';
import StatusDropdown from "./StatusDropDown";


const CustomerRow = ({ customer, deleteCustomer, isMainPage }) => {

  const [status, setStatus] = useState(customer.status);
  const [currentCustomer, setCustomer] = useState(customer);


  const handleStatusUpdate = async (newStatus) => {
    setStatus(newStatus);
    const updatedCustomer = await getCustomer(customer.id)
    setCustomer(updatedCustomer)
  }

  return (
    <div className="customer-row">
      
      <p className="row-title">{currentCustomer.name}</p>

      <div className="customer-info">
        <div className="info-field">
          <p>Email:</p>
          <p>{currentCustomer.email}</p>
        </div>

        <div className="info-field">
          <p>Mobile:</p>
          <p>{currentCustomer.phone}</p>
        </div>

        <div className="info-field">
          <p>Status:</p>
          <StatusDropdown customer={currentCustomer} status={status} handleStatusUpdate={handleStatusUpdate} />
        </div>

        <div className="info-field">
          <p>Last Change:</p>
          <p>{currentCustomer.lastChange}</p>
        </div>
      </div>

      
      {isMainPage ? (
        <div className="row-actions">
          <Link to={`/customers/${customer.id}`}>
            <button className="success">View Customer</button>
          </Link>
          <button className="danger" onClick={() => deleteCustomer(customer.id)}>Delete Customer</button>
        </div>
      ) : (
        <div className="row-actions">
          <Link to={`/customers/${customer.id}/edit`}>
            <button className="primary">Edit Customer</button>
          </Link>
        </div>
      )}
 
      
    </div>
  )
}

export default CustomerRow;