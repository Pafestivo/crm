import React, { useEffect, useState } from "react";
import AddNewCustomer from "./components/AddNewCustomer";
import { getCustomers, addCustomerToServer, deleteCustomerFromServer } from "./server-requests";
import CustomerRow from "./components/CustomerRow";
import 'bootstrap/dist/css/bootstrap.min.css';

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
    <div>
      {loading ? (
        <p style={{margin: "100px"}}>Loading...</p>
      ) : (
        <div>
          {customers.map((customer) => (
            <div key={customer.id} style={{margin: "100px"}}>
                <CustomerRow key={customer.id} customer={customer} deleteCustomer={deleteCustomer} />
            </div>
        ))}
        </div>

      )}

      {loading ? null : showAddNewCustomer ? (
        <div style={{margin: "100px"}}>
          <AddNewCustomer addCustomer={addCustomer} />
          <button className="btn btn-danger" onClick={toggleAddNewCustomer}>Cancel</button>
        </div>
      ) : (
        <button className="btn btn-success" onClick={toggleAddNewCustomer} style={{marginLeft: "100px"}}>Add New Customer</button>
      )}
    </div>
  );
}

export default App;
