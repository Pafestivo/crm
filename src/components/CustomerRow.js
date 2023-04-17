import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";


const CustomerRow = ({ customer, deleteCustomer }) => {

  return (
    <div>
      <div className="row align-items-center justify-content-center bg-light">
        <Link className="col-md" to={`/customers/${customer.id}`}>
          <p>{customer.name}</p>
        </Link>
          <p className="col-md">{customer.email}</p>
          <p className="col-md">{customer.phone}</p>
          <p className="col-md">{customer.status}</p>
          <p className="col-md">{customer.lastChange}</p>
        <button className="col-md btn btn-primary " onClick={() => deleteCustomer(customer.id)}>Delete Customer</button>
      </div>
    </div>
  )
}

export default CustomerRow;