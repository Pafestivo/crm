const customersURL = 'https://crm-server-2ja0.onrender.com/customers';

const getCustomers = async () => {
  const response = await fetch(customersURL);
  const customers = await response.json();
  return customers;
}

const getCustomer = async (id) => {
  const response = await fetch(`${customersURL}/${id}`);
  const customer = await response.json();
  return customer;
}

export { getCustomers, getCustomer }