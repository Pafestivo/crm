import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import App from "./App";
import { updateCustomerOnServer } from "./server-requests";
import CustomerPage from "./components/CustomerPage";
import EditCustomer from "./components/EditCustomer";

const RouteSwitch = () => {

  const updateCustomer = async (id, name, email, phone, status) => {
    await updateCustomerOnServer(id, name, email, phone, status);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/customers" element={<App />} />
        <Route path="customers/:id" element={<CustomerPage />} />
        <Route path="customers/:id/edit" element={<EditCustomer updateCustomer={updateCustomer}/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default RouteSwitch;