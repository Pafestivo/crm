import React from "react";
import { Link } from "react-router-dom";
import '../styles/customer-row.css'


const CustomerRow = ({ customer, deleteCustomer }) => {

  return (
    <div className="customer-row">
      
      <p className="row-title">{customer.name}</p>

      <div className="customer-info">
        <div className="info-field">
          <p>Email:</p>
          <p>{customer.email}</p>
        </div>

        <div className="info-field">
          <p>Mobile:</p>
          <p>{customer.phone}</p>
        </div>

        <div className="info-field">
          <p>Status:</p>
          <p>{customer.status}</p>
        </div>

        <div className="info-field">
          <p>Last Change:</p>
          <p>{customer.lastChange}</p>
        </div>
      </div>

      <div className="row-actions">
        <Link to={`/customers/${customer.id}`}>
          <button className="success">View Customer</button>
        </Link>
        <button className="danger" onClick={() => deleteCustomer(customer.id)}>Delete Customer</button>
      </div>
      
    </div>
  )
}

export default CustomerRow;