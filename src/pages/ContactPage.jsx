import React from 'react';
import './style/TravelTips.css';

function ContactPage() {
  return (
    <div className="tips-container">
      <h2 className="tips-heading">Contact Us</h2>
      <p>We'd love to hear from you! Whether you have a question about our services, need assistance, or just want to share your travel experiences, feel free to get in touch with us.</p>
      <p>If we cannot help you, we highly advise you to contact the travel agency of your trip!</p>
      <div className="contact-details">
        <p><strong>Phone:</strong> +123-456-7890</p>
        <p><strong>Email:</strong> contact@traveltemptation.com</p>
      </div>

      <form className="contact-form">
        <label>
          Name:
          <input type="text" name="name" required />
        </label>
        <label>
          Email:
          <input type="email" name="email" required />
        </label>
        <label>
          Subject:
          <input type="text" name="subject" required />
        </label>
        <label>
          Message:
          <textarea name="message" rows="5" required></textarea>
        </label>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}

export default ContactPage;
