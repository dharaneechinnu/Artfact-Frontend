import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css'
import { ToastContainer } from 'react-toastify';
import Api from '../Api/Api';
const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Api.post('/Auth/login', { email, password });
      const { userId, role, accessToken, Name,Email } = response.data; // Extract user name from response
  
      if (role === "User") {
        console.log(response.data);
        console.log('User ID:', userId);
  
        // Store user ID, access token, and user name in local storage
        localStorage.setItem('userId', userId);
        localStorage.setItem('email', Email);
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('userName', Name);
  
        if (response.status === 200) {
          console.log("Success-login")
          if (role === "User") {
            history('/Home');
          }
        }
      } else {
        history('/reg')
        alert("Register again with other email")
      }
    } catch (error) {
      toast.error("Email or password wrong!")
      console.error('Error in API call:', error);
    }
  };
  
  return (
  <>
   <div className="center-containers">
 <ToastContainer/>
      <div className="login-container">
       
        <h2 className='login_title'>Login</h2>
        <form onSubmit={handleSubmit}  id='loginForm'>
        
          <div>
            <label className='Name' htmlFor='email'>E-mail:</label><br></br>
            <input
              type="email"
              id='email'
              name='email'
              className='names_text'
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div>
            <label className='password' htmlFor='password'>Password:</label>
            <input
              type="password"
              id='password'
              name='password'
              className='pwd_text'
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          <br />
          <p>
            Don't have an account <Link to='/reg'>SignUp</Link>
          </p><br></br>
           <Link to='/Auth' className='for'>forget password?</Link>
          <button type="submit" className='sub_text'>Login</button>
        </form>
      </div>
    </div>
  </>
  )
}

export default Login