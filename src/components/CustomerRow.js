import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";


const CustomerRow = ({ customer, deleteCustomer }) => {

  return (
    <div>
      <div className="d-flex">
        <Link to={`/customers/${customer.id}`}>
          <p>{customer.name}</p>
        </Link>
          <p>{customer.email}</p>
          <p>{customer.phone}</p>
          <p>{customer.status}</p>
          <p>{customer.lastChange}</p>
        <button className="btn btn-primary" onClick={() => deleteCustomer(customer.id)}>Delete Customer</button>
      </div>
    </div>
  )
}

export default CustomerRow;