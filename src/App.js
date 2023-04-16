import React, { useState } from "react";
import CustomerInput from "./components/CustomerInput";
import { getCustomers } from "./server-requests";
import Customer from "./components/Customer";

function App() {
  const [customers, setCustomers] = useState([])
  const [showCustomerInput, setShowCustomerInput] = useState(false)

  const loadCustomers = async () => {
    const customers = await getCustomers()
    setCustomers(customers)
  }

  const toggleCustomerInput = () => {
    setShowCustomerInput(!showCustomerInput)
  }
  
  const addCustomer = (name, email, phone) => {
    toggleCustomerInput()
    setCustomers([
      ...customers, 
      {
        id: crypto.randomUUID(),
        name: name,
        email: email,
        phone: phone,
        status: 'Pick a status',
        lastChange: new Date().toLocaleString()
      }
    ])
  }

  useState(() => {
    loadCustomers()
  }, [customers])

  return (
    <div className="App">
      {customers.map((customer) => (
        <Customer key={customer.id} customer={customer} />
      ))}
      {showCustomerInput ? (
        <div className="new-customer-input">
          <CustomerInput addCustomer={addCustomer} />
          <button onClick={toggleCustomerInput}>Cancel</button>
        </div>
      ) : (
        <button onClick={toggleCustomerInput}>Add New Customer</button>
      )}
    </div>
  );
}

export default App;
