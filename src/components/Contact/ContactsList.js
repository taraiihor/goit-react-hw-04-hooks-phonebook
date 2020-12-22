import PropTypes from 'prop-types';
import './ContactsList.css';

function ContactsList({ contacts, onDeleteContact }) {
  return (
    <ul>
      {contacts.map(({ id, name, number }) => (
        <li key={id} className="item__contact">
          <p className="item__text">{name}</p>
          <p className="item__text">{number}</p>
          <button className="item__buttom" onClick={() => onDeleteContact(id)}>
            стерти
          </button>
        </li>
      ))}
    </ul>
  );
}
ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object),
};
export default ContactsList;
