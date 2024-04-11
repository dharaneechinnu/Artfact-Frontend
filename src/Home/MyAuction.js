import React, { useEffect, useState } from 'react';
import Api from '../Api/Api';
import './MyAuction.css';
import Navbar from '../navbar/Nav';

const MyAuction = () => {
  const [userAuctions, setUserAuctions] = useState([]);
  const [editAuction, setEditAuction] = useState(null);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchUserAuctions = async () => {
      try {
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

  const handleEditAuction = (auctionId) => {
    const auctionToEdit = userAuctions.find(auction => auction._id === auctionId);
    setEditAuction(auctionToEdit);
  };

  const handleUpdateAuction = async () => {
    try {
      const response = await Api.put(`/api/auctions/${editAuction._id}`, editAuction);
      if (response.status === 200) {
        alert('Auction updated successfully');
        setEditAuction(null);
        // You may want to refetch user auctions here to get the updated data
      } else {
        throw new Error('Failed to update auction');
      }
    } catch (error) {
      console.error('Error updating auction:', error);
      alert('Failed to update auction. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditAuction(prevAuction => ({
      ...prevAuction,
      [name]: value
    }));
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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userAuctions.map(auction => (
            <tr key={auction._id}>
              <td>{auction.item}</td>
              <td>
                {editAuction && editAuction._id === auction._id ? (
                  <input
                    type="text"
                    name="value"
                    value={editAuction.value}
                    onChange={handleChange}
                  />
                ) : (
                  auction.value
                )}
              </td>
              <td>{auction.winningBidder}</td>
              <td>{auction.highestBid}</td>
              <td><img src={auction.image} alt={auction.item} /></td>
              <td>
                {editAuction && editAuction._id === auction._id ? (
                  <div>
                    <button onClick={handleUpdateAuction} className='btn-save'>Save</button>
                    <button onClick={() => setEditAuction(null)} className='btn-cancel'>Cancel</button>
                  </div>
                ) : (
                  <button onClick={() => handleEditAuction(auction._id)} className='btn-edit'>Edit</button>
                )}
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
