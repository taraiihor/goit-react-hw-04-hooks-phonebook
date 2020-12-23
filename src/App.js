import { useState, useEffect } from 'react';
import ContactsList from './components/Contact/';
import { v4 as uniqueId } from 'uuid';
import ContactForm from './components/Form/';
import Filter from './components/Filter/';
import './App.css';
// const contacTest = [
//   { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//   { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//   { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//   { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
// ];
const useLocalStorage = (key, defaultValue) => {
  const [state, setState] = useState(
    () => JSON.parse(window.localStorage.getItem(key)) ?? defaultValue,
  );

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};

function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

  const addContact = (name, number) => {
    if (contacts.find(contact => contact.name === name)) {
      alert(`${name} з таким ім’ям вже є.`);
      return;
    }
    const newContacts = {
      id: uniqueId(),
      name,
      number,
    };

    setContacts(prevState => [newContacts, ...prevState]);
  };
  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };
  const changeFilter = ({ target }) => {
    setFilter(target.value);
  };
  const visibleContacts = () => {
    const normalized = filter.toLowerCase().trim();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalized),
    );
  };

  return (
    <div className="Containet">
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChangle={changeFilter} />
      {!contacts.length && <div>Немає жодного контакту, додайте контакт</div>}
      <ContactsList
        contacts={visibleContacts()}
        onDeleteContact={deleteContact}
      />
    </div>
  );
}

export default App;
