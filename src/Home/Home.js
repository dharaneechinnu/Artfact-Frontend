import React, { useState, useEffect } from 'react';
import './Home.css';
import Nav from '../navbar/Nav';
import Api from '../Api/Api'
import CustomNavbar from '../navbar/Nav';
const Home = () => {
  const [auctions, setAuctions] = useState([]);
  const [auctionItem, setAuctionItem] = useState('');
  const [auctionValue, setAuctionValue] = useState('');
  const [auctionImageUrl, setAuctionImageUrl] = useState('');
  const userId =  localStorage.getItem('userId');
  const addAuction = async () => {
    if (!auctionItem || !auctionValue || !auctionImageUrl) {
      alert('Please enter both auction item, value, and image URL.');
      return;
    }

    try {
      const response = await Api.post('/api/addAuction',{userId,item: auctionItem,value: auctionValue,image: auctionImageUrl,});

      if (response.status === 200) {
        const data = await response.data;
        setAuctions([...auctions, data]);
        setAuctionItem('');
        setAuctionValue('');
        setAuctionImageUrl('');
        alert('Auction added successfully!');
      } else {
        throw new Error('Failed to add auction');
      }
    } catch (error) {
      console.error('Error adding auction:', error);
      alert('Failed to add auction. Please try again.',error);
    }
  };

  // const joinAuction = async (auctionId, currentBid) => {
  //   try {
  //     const response = await Api.put(`/api/joinAuction/${auctionId}`, { currentBid });

  //     if (response.ok) {
  //       const data = await response.json();
  //       const updatedAuctions = auctions.map(auction => {
  //         if (auction.id === auctionId) {
  //           return data;
  //         }
  //         return auction;
  //       });
  //       setAuctions(updatedAuctions);
  //       alert('Bid placed successfully!');
  //     } else {
  //       throw new Error('Failed to join auction');
  //     }
  //   } catch (error) {
  //     console.error('Error joining auction:', error);
  //     alert('Failed to join auction. Please try again.');
  //   }
  // };

  

  return (
    <>
    <Nav/>
      <div className="container">
        
        <h2>Auction System</h2>
        <div className="add-auction">
          <h3>Add Auction</h3>
          <input
            type="text"
            placeholder="Enter auction item"
            value={auctionItem}
            onChange={(e) => setAuctionItem(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter auction value"
            value={auctionValue}
            onChange={(e) => setAuctionValue(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter image URL"
            value={auctionImageUrl}
            onChange={(e) => setAuctionImageUrl(e.target.value)}
          />
          <button className='add-btn' onClick={addAuction}>Add Auction</button>
        </div>
        <hr />
        
      </div>
    </>
  );
};

export default Home;
