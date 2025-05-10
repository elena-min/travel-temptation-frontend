import React from 'react';
import { Link } from 'react-router-dom';

const DefaultLayout = ({ children }) => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/trips">Trips</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>

      <div>{children}</div>
    </>
  );
}

export default DefaultLayout;
