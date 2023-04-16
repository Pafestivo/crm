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

  useEffect(() => {
    loadCustomers();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {customers.map((customer) => (
            <div key={customer.id}>
                <CustomerRow key={customer.id} customer={customer} deleteCustomer={deleteCustomer} />
            </div>
        ))}
        </div>

      )}

      {loading ? null : showAddNewCustomer ? (
        <div>
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
