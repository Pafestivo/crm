import React from "react";

const Customer = ({ customer, deleteCustomer }) => {

  return (
    <div className="customer">
      <p>{customer.name}</p>
      <p>{customer.email}</p>
      <p>{customer.phone}</p>
      <p>{customer.status}</p>
      <p>{customer.lastChange}</p>
      <button onClick={() => deleteCustomer(customer.id)}>Delete Customer</button>
    </div>
  )
}

export default Customer;