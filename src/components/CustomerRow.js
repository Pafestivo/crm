import React from "react";

const CustomerRow = ({ customer }) => {

  return (
    <div className="customer-row">
      <p>{customer.name}</p>
      <p>{customer.email}</p>
      <p>{customer.phone}</p>
      <p>{customer.status}</p>
      <p>{customer.lastChange}</p>
    </div>
  )
}

export default CustomerRow;