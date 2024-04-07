import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import Login from './Login/Login';
import Register from './Register/Register';
import Home from './Home/Home';
import GetAll from './Home/GetAll';
import BiddingItem from './Home/BiddingItem';
import MyAuction from './Home/MyAuction';
import UserHome from './Home/userHome';

function App() {
  return (
   
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/reg' element={<Register/>}/>
        <Route path='/userHome' element={<UserHome/>}/>
        <Route path='/Home' element={<Home/>}/>
        <Route path='/AllItem' element={<GetAll/>}/>
        <Route path='/Myauc' element={<MyAuction/>}/>
        <Route path="/biddingitem/:id" element={<BiddingItem />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
