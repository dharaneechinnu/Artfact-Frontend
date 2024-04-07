// MyAuction.js

import React, { useEffect, useState } from 'react';
import Api from '../Api/Api';
import './MyAuction.css';
import Navbar from '../navbar/Nav';

const MyAuction = () => {
  const [userAuctions, setUserAuctions] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchUserAuctions = async () => {
      try {
        // Retrieve the user's auctions from the API using userId
        const response = await Api.get(`/api/auctions?userId=${userId}`);
        if (response.status === 200) {
          const data = await response.data;
          setUserAuctions(data);
        } else {
          throw new Error('Failed to fetch user auctions');
        }
      } catch (error) {
        console.error('Error fetching user auctions:', error);
      }
    };

    fetchUserAuctions();
  }, [userId]);

  const handleDeleteAuction = async (auctionId) => {
    try {
     
      const response = await Api.delete(`/api/auctions/${auctionId}`);
      if (response.status === 200) {
       
        setUserAuctions(prevAuctions => prevAuctions.filter(auction => auction._id !== auctionId));
        alert('Auction deleted successfully');
      } else {
        throw new Error('Failed to delete auction');
      }
    } catch (error) {
      console.error('Error deleting auction:', error);
      alert('Failed to delete auction. Please try again.');
    }
  };

  return (
    <>
    <Navbar/>
    <div className="my-auction-container">
      <h2>My Auctions</h2>
      <table className="my-auction-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Value</th>
            <th>Winner</th>
            <th>Winning Amount</th>
            <th>Image</th>
            <th>Action</th> {/* New column for delete button */}
          </tr>
        </thead>
        <tbody>
          {userAuctions.map(auction => (
            <tr key={auction._id}>
              <td>{auction.item}</td>
              <td>{auction.value}</td>
              <td>{auction.winningBidder}</td>
              <td>{auction.highestBid}</td>
              <td><img src={auction.image} alt={auction.item} /></td>
              <td>
                <button onClick={() => handleDeleteAuction(auction._id)} className='btn-del'>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default MyAuction;
