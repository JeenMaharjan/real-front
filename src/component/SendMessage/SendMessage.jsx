import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import './sendmail.css'

function SendMessage() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_5zlzs6b', 'template_bfwrfdv', form.current, {
        publicKey: 'tK3zoe1e___rTmCRA',
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

  return (
    <div className="sendmessage">
        <form ref={form} onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="name" />
      <label>Phone</label>
      <input type="number" name="phone" />
      <label>Email</label>
      <input type="email" name="email" />
      <label>Message</label>
      <textarea name="message" />
      <input type="submit" value="Send" />
    </form>
    </div>
    
  );
};

export default SendMessage