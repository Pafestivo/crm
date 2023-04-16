import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCustomer } from "../server-requests";
import { Link } from "react-router-dom";

const CustomerPage = () => {

  const [loading, setLoading] = useState(true);
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
          <div>
            <h1>Customer: {customer.name}</h1>
            <Link to={`/customers/${customer.id}/edit`}>
            <button>Edit</button>
            </Link>
            <p>Email: {customer.email}</p>
            <p>Phone: {customer.phone}</p>
            <p>Status: {customer.status}</p>
            <p>Last modified: {customer.lastChange}</p>
            <div>
              <h2>Notes</h2>
              {customer.notes ? 
              customer.notes.map((note) => (
                <div key={note.id}>
                  <p>{note.date} - {note.note}</p>
                </div>
              )) : <p>No notes yet...</p>
              }
            </div>
          </div>
      )}
    </div>
  )
}

export default CustomerPage;