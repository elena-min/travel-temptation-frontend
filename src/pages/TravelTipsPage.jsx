import React from 'react';
import './style/TravelTips.css';

function TravelTipsPage() {
  return (
    <div className="tips-container">
      <h2 className="tips-heading">Useful Tips for Traveling</h2>
      <ul className="tips-list">
        <li className="tip-item">
          <strong>1. Pack Light:</strong>
          <p>Try to pack only what you need and avoid overpacking. A lighter suitcase will make your journey more comfortable.</p>
        </li>
        <li className="tip-item">
          <strong>2. Research Your Destination:</strong>
          <p>Learn about the local culture, customs, and language to better integrate and avoid any misunderstandings.</p>
        </li>
        <li className="tip-item">
          <strong>3. Keep Important Documents Safe:</strong>
          <p>Make copies of your passport, ID, and travel insurance. Keep the copies separate from the original!!!</p>
        </li>
        <li className="tip-item">
          <strong>4. Stay Hydrated:</strong>
          <p>Drink plenty of water, especially during flights and in hot climates to stay healthy and energized.</p>
        </li>
        <li className="tip-item">
          <strong>5. Purchase Travel Insurance:</strong>
          <p>Ensure you have travel insurance to cover any unexpected incidents such as medical emergencies or trip cancellations.</p>
        </li>
        <li className="tip-item">
          <strong>6. Keep Your Valuables Secure:</strong>
          <p>Use a money belt or hidden pouch to store cash, credit cards, and other valuables while exploring new places.</p>
        </li>
        <li className="tip-item">
          <strong>7. Learn Basic Phrases:</strong>
          <p>Knowing a few phrases in the local language can go a long way in helping you navigate and show respect to locals.</p>
        </li>
        <li className="tip-item">
          <strong>8. Stay Connected:</strong>
          <p>Ensure you have a reliable way to contact home or emergency services. Consider an international phone plan or local SIM card.</p>
        </li>
        <li className="tip-item">
          <strong>9. Be Open-Minded:</strong>
          <p>Embrace new experiences, foods, and cultures with an open heart and mind. Travel is all about learning and growth.</p>
        </li>
        <li className="tip-item">
          <strong>10. Respect Local Customs:</strong>
          <p>Always be respectful of the local customs and traditions. Dress appropriately and behave considerately.</p>
        </li>
        <li className="tip-item">
          <strong>11. Have fun and take lots of pictures!!! :)</strong>
        </li>
      </ul>
    </div>
  );
}

export default TravelTipsPage;
