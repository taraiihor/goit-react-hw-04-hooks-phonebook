import { useState } from 'react';
import './ContactForm.css';

function ContactForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = ({ target }) => {
    const { name, value } = target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };
  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(name, number);
    reset();
  };
  const reset = () => {
    setName('');
    setNumber('');
  };
  return (
    <form className="item__form" onSubmit={handleSubmit}>
      <label>
        Ім’я
        <input
          className="item__input"
          type="text"
          name="name"
          placeholder="Jony Dep"
          value={name}
          onChange={handleChange}
        />
      </label>
      <label>
        Телефон
        <input
          className="item__input"
          type="text"
          name="number"
          placeholder="111-11-11"
          value={number}
          onChange={handleChange}
        />
      </label>
      <button type="submit" disabled={name === '' || number === ''}>
        Зберегти контакт
      </button>
    </form>
  );
}

// class ContactForm extends Component {
//   state = {
//     name: '',
//     number: '',
//   };

//   handleChange = event => {
//     const { name, value } = event.currentTarget;
//     this.setState({ [name]: value });
//   };
//   handleSubmit = event => {
//     event.preventDefault();
//     const { name, number } = this.state;
//     this.props.onSubmit(name, number);
//     this.reset();
//   };
//   reset = () => {
//     this.setState({ name: '', number: '' });
//   };
//   render() {
//     const { name, number } = this.state;
//   }
// }
export default ContactForm;
