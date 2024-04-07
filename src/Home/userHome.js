import React from 'react';
import './userHoem.css'; // Import the CSS file for styling
import front from '../img/front.jpeg';
import Navbar from '../navbar/Nav';

const UserHome = () => {
  return (
    <>
      <Navbar />
      <div className="user-home-container">
        <div className="image-container">
          <img src={front} alt="Artifacts" className="artifacts-img" />
          <h1 className="slogan">Welcome to Artifact ,<br/>Discover the Past, Embrace the Future</h1>
        </div>
      </div>
    </>
  );
};

export default UserHome;
