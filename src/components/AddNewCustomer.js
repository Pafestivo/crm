import React, { useState } from "react";
import '../styles/add-new-customer.css';

const AddNewCustomer = ({ addCustomer, toggleAddNewCustomer }) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // update the state of the input fields
  const updateName = (e) => {
    setName(e.target.value);
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  }

  const updatePhone = (e) => {
    setPhone(e.target.value);
  }

  // handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if(!name || !email || !phone) {
      alert('Please fill out all fields');
      return;
    }
    if(!email.includes('@') || !email.includes('.')) {
      alert('Please enter a valid email address');
      return;
    }
    if(phone.length !== 10 || isNaN(phone) || phone[0] !== '0') {
      alert('Please enter a valid phone number');
      return;
    }

    addCustomer(name, email, phone);
    setName('');
    setEmail('');
    setPhone('');
  }

  
  return (
    <div className="add-customer-container">
      <form>
        <input onInput={updateName} type="text" name="customer-name" maxLength={13} placeholder="Customer Name" />
        <input onInput={updateEmail} type="email" name="customer-email" placeholder="Customer Email" />
        <input onInput={updatePhone} type="phone" name="customer-phone" placeholder="Customer Phone" />
      </form>
      <div className="add-customer-actions">
          <button className="success" onClick={handleSubmit} type="submit">Add Customer</button>
          <button className="danger" onClick={toggleAddNewCustomer}>Cancel</button>
        </div>
    </div>
  );
}

export default AddNewCustomer;