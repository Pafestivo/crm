import React from "react";

const Customer = ({ customer }) => {
  return (
    <div className="customer">
      <p>{customer.name}</p>
      <p>{customer.email}</p>
      <p>{customer.phone}</p>
      <p>{customer.status}</p>
      <p>{customer.lastChange}</p>
    </div>
  )
}

export default Customer;