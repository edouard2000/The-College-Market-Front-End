import React, { useState } from 'react';
import './support.css';
import { Link } from 'react-router-dom';
import AccountNavigation from '../personal/accountNavigation';

const ContactSupportPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [id, setId] = useState('');
  const [message, setMessage] = useState('');

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange  = (event)=>{
    setLastName(event.target.value)
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleIdChange = (event) => {
    setId(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const inputObject = {
    'First name' : handleFirstNameChange,
    'Last name' : handleLastNameChange,
    'Email' : handleEmailChange,
    'Customer id' : handleIdChange,
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setFirstName('');
    setEmail('');
    setLastName('');
    setId('');
    setMessage('');
  };

  return (
    <>
      
  
      <AccountNavigation navContent={{
                "Messages": 'messages',
                "My trading dashboard": "account/trading_index"
            }}/>
     
         <div className='contatc-margin'>
         <div className="contact-support-page">
              <h3 className='heading-contact'>Contact Us</h3>
                    <p className='paragraph-contact'>
                     "Need help or have a query? Share your details and message below!"
                    </p>
                    <form onSubmit={handleSubmit}>
                      {Object.keys(inputObject).map(inputKey => (
                        <input 
                          key={inputKey}
                          type="text" 
                          placeholder={inputKey} 
                          onChange={inputObject[inputKey]}
                          required
                        />
                      ))}
                      <textarea 
                        name="Message" 
                        placeholder='Message'
                        onChange={handleMessageChange}
                        value={message}
                        required
                      ></textarea>
                      <button type="submit" className='contactButton'>Send Message</button>
                    </form>
            </div>
         </div>

      
    </>
  );
};

export default ContactSupportPage;
