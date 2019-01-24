import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

const Sidebar = () => {
  return (

    <div className="sidebar-sticky">
      <ul className="nav flex-column">

        <li className="nav-item">
          <Link to="/" className="nav-link active">

            <a href="#">Contacts</a>

          </Link>

          <Link to="/add" className="nav-link active">

            <a href="#">Add Contact</a>

          </Link>

        </li>

      </ul>

    </div>
  );
};

export default Sidebar;
