import React from "react";

const Customer = () => {
  return (
    <div>
      <form>
        <input type="text" name="customer-name" placeholder="Customer Name" />
        <input type="email" name="customer-email" placeholder="Customer Email" />
        <input type="phone" name="customer-phone" placeholder="Customer Phone" />
      </form>
    </div>
  );
}

export default Customer;