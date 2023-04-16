import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import App from "./App";
import CustomerPage from "./components/CustomerPage";

const RouteSwitch = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/customers" element={<App />} />
        <Route path="customers/:id" element={<CustomerPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default RouteSwitch;