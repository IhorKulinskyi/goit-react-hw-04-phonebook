import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Form from './Form';
import Filter from './Filter';
import ContactsList from './ContactsList';

const STORAGE_KEY = 'contacts';

export const App = () => {
  const defaultContacts = [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ];

  const [contacts, setContacts] = useState(JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? defaultContacts);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const addContact = contact => {
    const isInContacts = contacts.find(c => c.name === contact.name);
    if (isInContacts) {
      alert(`${contact.name} is already in contacts`);
      return;
    }
    const newContact = { id: nanoid(), ...contact };
    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const deleteContact = e => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== e.target.id)
    );
  };

  const changeFilter = e => {
    setFilter(e.target.value);
  };

  const normalizeFilter = filter.toLowerCase();

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizeFilter)
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <Form onSubmit={addContact} />
      <h2>Contacts</h2>
      <Filter filter={filter} onChange={changeFilter} />
      <ContactsList contacts={filteredContacts} handleDelete={deleteContact} />
    </div>
  );
};
