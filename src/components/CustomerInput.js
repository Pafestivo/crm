import React, { useState } from "react";

const CustomerInput = ({ addCustomer }) => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const updateName = (e) => {
    setName(e.target.value)
  }

  const updateEmail = (e) => {
    setEmail(e.target.value)
  }

  const updatePhone = (e) => {
    setPhone(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addCustomer(name, email, phone)
  }
  return (
    <div>
      <form>
        <input onInput={updateName} type="text" name="customer-name" placeholder="Customer Name" />
        <input onInput={updateEmail} type="email" name="customer-email" placeholder="Customer Email" />
        <input onInput={updatePhone} type="phone" name="customer-phone" placeholder="Customer Phone" />
        <button onClick={handleSubmit} type="submit">Add Customer</button>
      </form>
    </div>
  );
}

export default CustomerInput;