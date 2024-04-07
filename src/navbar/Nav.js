import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css'; // Assuming you have a CSS file for styling

const Navbar = () => {

  const handleLogout = () => {
    // Clear all items from localStorage
    localStorage.clear();
  };
  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-left">
          <Link className="navbar-title" to="/userHome">Auction System</Link>
        </div>
        <div className="navbar-right">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/userHome">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/home">Add Auction</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Myauc">My Auction</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/AllItem">All Auction</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={handleLogout}>LogOut</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
