import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCustomer } from "../server-requests";

const CustomerPage = () => {

  const [loading, setLoading] = useState(true)
  const [customer, setCustomer] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
    const currentCustomer = await getCustomer(id);
    setCustomer(currentCustomer);
    setLoading(false);
    }

    fetchData();
  }, [id]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="customer-page">
          <h1>Customer: {customer.name}</h1>
          <p>Email: {customer.email}</p>
          <p>Phone: {customer.phone}</p>
          <p>Status: {customer.status}</p>
          <p>Last modified: {customer.lastChange}</p>
          <div className="customer-notes">
            <h2>Notes</h2>
            {customer.notes.map((note) => (
              <div className="single-note" key={note.id}>
                <p>{note.date} - {note.note}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default CustomerPage;