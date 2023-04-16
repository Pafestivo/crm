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

const addCustomerToServer = async (name, email, phone) => {
  const response = await fetch(customersURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      email: email,
      phone: phone,
      status: 'Pick a status',
      lastChange: new Date().toLocaleString()
    })
  });
  const customer = await response.json();
  return customer;
}

const deleteCustomerFromServer = async (id) => {
  const response = await fetch(`${customersURL}/${id}`, {
    method: 'DELETE'
  });
  const customer = await response.json();
  return customer;
}

const updateCustomerOnServer = async (id, name, email, phone, status) => {
  const response = await fetch(`${customersURL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      email: email,
      phone: phone,
      status: status,
      lastChange: new Date().toLocaleString()
    })
  });
  const customer = await response.json();
  return customer;
}

const addNoteToServer = async (customerId, note, currentCustomer) => {
  const response = await fetch(`${customersURL}/${customerId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...currentCustomer,
      notes: currentCustomer.notes ? [
        ...currentCustomer.notes,
        {
          id: crypto.randomUUID(),
          note: note,
          date: new Date().toLocaleString()
        }
      ] : [{
          id: crypto.randomUUID(),
          note: note,
          date: new Date().toLocaleString()
        }]
    })
  });
  const customer = await response.json();
  return customer;
}

const deleteNoteFromServer = async (customerId, noteId, currentCustomer) => {
  const response = await fetch(`${customersURL}/${customerId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...currentCustomer,
      notes: currentCustomer.notes.filter((note) => note.id !== noteId)
    })
  });
  const customer = await response.json();
  return customer;
}


// Edit Note - Work In Progress
// const updateNoteOnServer = async (customerId, noteId, note, currentCustomer) => {
//   const response = await fetch(`${customersURL}/${customerId}`, {
//     method: 'PATCH',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       ...currentCustomer,
//       notes: [
//         ...currentCustomer.notes,
//         currentCustomer.notes.find((note) => note.id === noteId).note = note,
//       ]
//     })
//   });
//   const customer = await response.json();
//   return customer;
// }

export { getCustomers, getCustomer, addCustomerToServer, deleteCustomerFromServer, updateCustomerOnServer, addNoteToServer,deleteNoteFromServer }