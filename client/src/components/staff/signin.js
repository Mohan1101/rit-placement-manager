import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://rit-placement-manager.vercel.app/login', {
        username,
        password,
      });

      if (response.data.success) {
        setErrorMessage('');
        localStorage.setItem('username', username);
        navigate('/staff');
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessage('Error logging in. Please try again.');
    }
  };

    return (
        <div className={'mainContainer'}>
             <div className={'signinContainer'}>
            <div className={'titleContainer'}>
                <div>Admin Login</div>
            </div>
            <br />
            <hr/>
            <div className={'inputContainer'}>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    className={'inputBox'}
                  
                    id="username"
                    placeholder="Enter your username here"
                    value={username}
                    onChange={handleUsernameChange}
                />
            </div>
            <br />
           
            <div className={'inputContainer'}>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    className={'inputBox'}
                    id="password"
                    placeholder="Enter your password here"
                    value={password}
                    onChange={handlePasswordChange}
                />
            </div>
            <br />
            <div className={'inputContainer'}>
                <button type="submit" className={'loginButton'} onClick={handleLogin}>
                    Login
                </button>
            </div>
            {errorMessage && (
                <div className={'errorContainer'}>
                    <label className={'errorLabel'}>{errorMessage}</label>
                </div>
            )}
            </div>
        </div>
    );
}

export default Signin;
