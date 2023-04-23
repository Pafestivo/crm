import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCustomer } from "../server-requests";
import LoadingScreen from "./LoadingScreen";
import Header from "./Header";
import '../styles/edit-customer.css'

const EditCustomer = ({ updateCustomer }) => {

  const navigate = useNavigate()
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams()
  
  useEffect(() => {
    const fetchData = async () => {
    const currentCustomer = await getCustomer(id);
    setCustomer(currentCustomer);
    setName(currentCustomer.name);
    setEmail(currentCustomer.email);
    setPhone(currentCustomer.phone);
    setStatus(currentCustomer.status);
    setLoading(false);
    }

    fetchData();
  }, [id]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('');

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
  const handleSubmit = async (e) => {
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
    setLoading(true);
    await updateCustomer(customer, customer.id, name, email, phone, status);
    setLoading(false);
    navigate(`/customers/${customer.id}`);
  }

  
  return (
    <div className="container">

      <Header title={'Edit Customer'} />

      {loading ? (
        <LoadingScreen />
      ) : null}

      {customer ? (
        <form className="edit-customer">
          <input onInput={updateName} type="text" name="customer-name" placeholder="Customer Name" defaultValue={customer.name} />
          <input onInput={updateEmail} type="email" name="customer-email" placeholder="Customer Email" defaultValue={customer.email} />
          <input onInput={updatePhone} type="phone" name="customer-phone" placeholder="Customer Phone" defaultValue={customer.phone} />
          <button className="btn success" onClick={handleSubmit} type="submit">Update Customer</button>
          <button className="btn danger" onClick={() => navigate(`/customers/${customer.id}`)} type="submit">Cancel</button>
        </form>        
      ) : (
        null
      )}
    </div>
  );
}

export default EditCustomer;