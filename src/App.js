import React, { useEffect, useState } from "react";
import AddNewCustomer from "./components/AddNewCustomer";
import { getCustomers, addCustomerToServer, deleteCustomerFromServer } from "./server-requests";
import CustomerRow from "./components/CustomerRow";
import "./styles/app.css";
import LoadingScreen from "./components/LoadingScreen";
import Header from "./components/Header";

function App() {
  const [customers, setCustomers] = useState([]);
  const [showAddNewCustomer, setShowAddNewCustomer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [customersPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [customersToDisplay, setCustomersToDisplay] = useState([]);

  const loadCustomers = async () => {
    const customers = await getCustomers();
    setCustomers(customers);
    setCustomersToDisplay(customers);
    setLoading(false);
  }

  // on page-load
  useEffect(() => {
    loadCustomers();
  }, []);

  useEffect(() => {
    if (searchQuery === '') {
      setCustomersToDisplay(customers);
      return;
    }
    const searchedCustomers = customers.filter(customer =>
      Object.values(customer).some(value =>
        typeof value === 'string' && value.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setCustomersToDisplay(searchedCustomers);
    setCurrentPage(1);
  }, [searchQuery, customers]);

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

  // pagination
  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = customersToDisplay.slice(indexOfFirstCustomer, indexOfLastCustomer);

  const totalPages = Math.ceil(customersToDisplay.length / customersPerPage);

  const changePage = (page) => {
    if(page === "next") {
      if (currentPage === totalPages) return;
      setCurrentPage(currentPage + 1);

    } else if(page === "previous") {
      if (currentPage === 1) return;
      setCurrentPage(currentPage - 1);
    } else {
      if(+page.target.value >  totalPages ||+page.target.value < 1) return;  
      setCurrentPage(+page.target.value)
    }
  }

  // search bar
  const updateSearchQuery = (e) => {
    setSearchQuery(e.target.value);
  }


  return (
    <div className="app-container">
      {loading ? <LoadingScreen /> : null}

      <Header title='Your Customers' />

      <div className="table-container">
        <input onInput={updateSearchQuery} type="text" placeholder="Search customer" />

        {currentCustomers.length === 0 ? (
          <h1 style={{margin: "0 auto"}}>No customers found</h1>
        ) : null}

        {currentCustomers.map((customer, index) => (
          <div key={customer.id} data-testid={`customer-${index}`} >
            <CustomerRow key={customer.id} customer={customer} deleteCustomer={deleteCustomer} isMainPage={true} />
          </div>
        ))}
      </div>

      {currentCustomers.length === 0 ? null : (
        showAddNewCustomer ? (
          <div>
            <AddNewCustomer addCustomer={addCustomer} toggleAddNewCustomer={toggleAddNewCustomer} />
          </div>
        ) : (
          <div className="main-page-actions">
            <p>page {currentPage} out of {totalPages}</p>
            <div className="main-page-buttons">
              <button className="btn primary pagi-btn" onClick={() => changePage('previous')}>{'<'}</button>
            
              <button className="success" onClick={toggleAddNewCustomer}>Add New Customer</button>
              <button className="btn primary pagi-btn" onClick={() => changePage('next')}>{'>'}</button>
            </div>
  
            <div className="choose-page">
              <p>Jump to page <input onChange={(e) => changePage(e)} type="number" defaultValue={currentPage} /></p>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default App;
