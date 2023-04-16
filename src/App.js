import React, { useEffect, useState } from "react";
import AddNewCustomer from "./components/AddNewCustomer";
import { getCustomers } from "./server-requests";
import CustomerRow from "./components/CustomerRow";
import { Link } from "react-router-dom";

function App() {
  const [customers, setCustomers] = useState([]);
  const [showAddNewCustomer, setShowAddNewCustomer] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadCustomers = async () => {
    const customers = await getCustomers();
    setCustomers(customers);
    setLoading(false);
  }

  const toggleAddNewCustomer = () => {
    setShowAddNewCustomer(!showAddNewCustomer);
  }
  
  const addCustomer = (name, email, phone) => {
    toggleAddNewCustomer();
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
    ]);
  }

  const deleteCustomer = (id) => {
    setCustomers(customers.filter((customer) => customer.id !== id));
  }

  useEffect(() => {
    loadCustomers();
  }, [customers]);

  return (
    <div className="App">
      {loading ? (
        <p>Loading...</p>
      ) : (
        customers.map((customer) => (
          <div className="customer" key={customer.id}>
            <Link to={`/customers/${customer.id}`}>
              <CustomerRow key={customer.id} customer={customer} />
            </Link>
            <button onClick={() => deleteCustomer(customer.id)}>Delete Customer</button>
          </div>
        ))
      )}

      {loading ? null : showAddNewCustomer ? (
        <div className="new-customer-input">
          <AddNewCustomer addCustomer={addCustomer} />
          <button onClick={toggleAddNewCustomer}>Cancel</button>
        </div>
      ) : (
        <button onClick={toggleAddNewCustomer}>Add New Customer</button>
      )}
    </div>
  );
}

export default App;
