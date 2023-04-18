import React, { useEffect, useState } from "react";
import AddNewCustomer from "./components/AddNewCustomer";
import { getCustomers, addCustomerToServer, deleteCustomerFromServer } from "./server-requests";
import CustomerRow from "./components/CustomerRow";
import "./styles/app.css";

function App() {
  const [customers, setCustomers] = useState([]);
  const [showAddNewCustomer, setShowAddNewCustomer] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadCustomers = async () => {
    const customers = await getCustomers();
    setCustomers(customers);
    setLoading(false);
  }

  // on page-load
  useEffect(() => {
    loadCustomers();
  }, []);

  const toggleAddNewCustomer = () => {
    setShowAddNewCustomer(!showAddNewCustomer);
  }
  
  const addCustomer = async (name, email, phone) => {
    setLoading(true);
    toggleAddNewCustomer();
    await addCustomerToServer(name, email, phone);
    loadCustomers();
  }

  const deleteCustomer = async (id) => {
    setLoading(true);
    await deleteCustomerFromServer(id);
    loadCustomers();
  }

  return (
    <div className="app-container">
      {loading ? null : (
        <div className="header">
          <h1>Your Customers</h1>
        </div>
          )}


      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="table-container">
          {customers.map((customer) => (
            <div key={customer.id}>
                <CustomerRow key={customer.id} customer={customer} deleteCustomer={deleteCustomer} />
            </div>
        ))}
        </div>

      )}

      {loading ? null : showAddNewCustomer ? (
        <div style={{width: "100%"}}>
          <AddNewCustomer addCustomer={addCustomer} toggleAddNewCustomer={toggleAddNewCustomer} />
        </div>
      ) : (
        <button className="success" onClick={toggleAddNewCustomer}>Add New Customer</button>
      )}
    </div>
  );
}

export default App;
