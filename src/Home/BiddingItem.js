import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Api from '../Api/Api';
import './BiddingItem.css';

const BiddingItem = () => {
  const { id } = useParams();
  const [auction, setAuction] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [highestBid, setHighestBid] = useState(0);
  const [winningBidder, setWinningBidder] = useState('');
  const [timer, setTimer] = useState(10000); // 2 minutes in milliseconds
  const userId = localStorage.getItem('email');
  const history = useNavigate();

  useEffect(() => {
    const fetchAuction = async () => {
      try {
        const response = await Api.get(`/api/auctions/${id}`);
        if (response.status === 200) {
          const data = await response.data;
          setAuction(data);
          setHighestBid(data.highestBid); // Set the initial highest bid
        } else {
          throw new Error('Failed to fetch auction');
        }
      } catch (error) {
        console.error('Error fetching auction:', error);
      }
    };

    fetchAuction();
  }, [id]);

  const handleSubmitBid = async (e) => {
    e.preventDefault();
    if (!bidAmount || isNaN(bidAmount)) {
      alert('Please enter a valid bid amount.');
      return;
    }

    try {
      const response = await Api.post(`/api/auctions/${id}/bid`, {
        amount: bidAmount,
        userId: userId
      });

      if (response.status === 200) {
        const responseData = await response.data;
        setHighestBid(responseData.highestBid);
        setWinningBidder(responseData.winningBidder);
        setBidAmount('');
        alert('Bid placed successfully!');
      } else {
        const errorData = await response.data;
        alert(`Failed to place bid: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Frontend Error placing bid:', error);
      alert('Failed to place bid. Please try again.');
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer(prevTimer => prevTimer - 1000);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (timer === 0) {
      // If timer reaches zero, fetch the auction details to determine the winning bidder
      const fetchWinner = async () => {
        try {
          const response = await Api.get(`/api/auctions/${id}`);
          if (response.status === 200) {
            const data = await response.data;
            setWinningBidder(data.winningBidder);
            // Show alert message with winner's name
            alert(`Auction has ended! Winner: ${data.winningBidder}`);
            history('/AllItem');
          } else {
            throw new Error('Failed to fetch auction details');
          }
        } catch (error) {
          console.error('Error fetching auction details:', error);
        }
      };
      fetchWinner();
    }
  }, [timer, id, history]);

  return (
    <div className="bidding-item-container">
      {auction ? (
        <div className="bidding-item">
          <h1 className="item-title">{auction.item}</h1>
          <p className="item-value">Value: {auction.value}</p>
          <img src={auction.image} alt={auction.item} className="item-image" />
          <form onSubmit={handleSubmitBid} className="bid-form">
            <input type="number" value={bidAmount} onChange={(e) => setBidAmount(e.target.value)} className="bid-input" />
            <button type="submit" className="bid-button">Place Bid</button>
          </form>
          <p className="highest-bid">Highest Bid: {highestBid}</p>
          {winningBidder && <p className="winning-bidder">Winning Bidder: {winningBidder}</p>}
          {winningBidder && <p className="sold-out">Sold Out</p>}
          <p className="timer">Time Remaining: {Math.floor(timer / 60000)}:{((timer % 60000) / 1000).toFixed(0).padStart(2, '0')}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BiddingItem;
