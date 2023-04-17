import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import App from "./App";
import { addNoteToServer, updateCustomerOnServer } from "./server-requests";
import CustomerPage from "./components/CustomerPage";
import EditCustomer from "./components/EditCustomer";
import EditNote from "./components/EditNote";

const RouteSwitch = () => {

  const updateCustomer = async (customer, id, name, email, phone, status) => {
    await updateCustomerOnServer(customer, id, name, email, phone, status);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/customers" element={<App />} />
        <Route path="customers/:id" element={<CustomerPage addNoteToServer={addNoteToServer} />} />
        <Route path="customers/:id/edit" element={<EditCustomer updateCustomer={updateCustomer}/>} />
        <Route path="customers/:id/:id/edit" element={<EditNote />} />
      </Routes>
    </BrowserRouter>
  )
}

export default RouteSwitch;