// GetAll.js

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import Api from '../Api/Api';
import './GetAll.css';
import Navbar from '../navbar/Nav';

const GetAll = () => {
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await Api.get('/api/auctions');
        if (response.status === 200) {
          const data = await response.data;
          setAuctions(data);
        } else {
          throw new Error('Failed to fetch auctions');
        }
      } catch (error) {
        console.error('Error fetching auctions:', error);
      }
    };

    fetchAuctions();
  }, []);

  return (
    <>
    <Navbar/>
    <div className="auctions-container">
      <h2>All Auctions</h2>
      <ul>
        {auctions.map(auction => (
          <li key={auction._id}>
            <h3>{auction.item}</h3>
            <p>Value: {auction.value}</p>
            <img src={auction.image} alt={auction.item} /><br></br>
           
            {auction.winningBidder ? (
              <p className="sold-out">Sold Out</p>
            ) : (
              <Link to={`/biddingitem/${auction._id}`} className='btn-join'>Join the Auction</Link>
            )}
          </li>
        ))}
      </ul>
    </div>
    </>
  );
};

export default GetAll;
