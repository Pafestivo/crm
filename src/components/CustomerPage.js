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
      ) : <h1>{customer.name}</h1>}
    </div>
  )
}

export default CustomerPage;