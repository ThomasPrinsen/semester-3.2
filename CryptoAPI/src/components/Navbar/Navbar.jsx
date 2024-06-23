import React, { useContext } from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';
import arrow_icon from '../../assets/arrow_icon.png';
import { Link, useNavigate } from 'react-router-dom';
import { CoinContext } from '../../context/CoinContext';
import { getAuth, signOut } from 'firebase/auth';

const Navbar = ({ currentUser }) => {
  const { setCurrency } = useContext(CoinContext);
  const navigate = useNavigate();
  const auth = getAuth();

  const currencyHandler = (event) => {
    switch (event.target.value) {
      case 'usd':
        setCurrency({ name: 'usd', symbol: '$' });
        break;
      case 'eur':
        setCurrency({ name: 'eur', symbol: '€' });
        break;
      case 'inr':
        setCurrency({ name: 'inr', symbol: '₹' });
        break;
      default:
        setCurrency({ name: 'usd', symbol: '$' });
        break;
    }
  };

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error('Error signing out: ', error);
      });
  };

  return (
    <div className='navbar'>
      <Link to="/">
        <img src={logo} alt="Logo" className="logo" />
      </Link>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/news">News</Link>
        </li>
        <li>
          <Link to="/tips-tricks">Tips & Tricks</Link>
        </li>
        <li>
          <Link to="/about-us">About Us</Link>
        </li>
      </ul>
      <div className="nav-right">
        <select onChange={currencyHandler}>
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="inr">INR</option>
        </select>
        {currentUser ? (
          <div className="user-controls">
            <button onClick={handleSignOut} className="sign-out-button">
              Log Out <img src={arrow_icon} alt="Arrow icon" />
            </button>
            <span className="user-info">Signed in as: {currentUser.email}</span>
          </div>
        ) : (
          <button onClick={handleSignUpClick}>
            Sign up / Log in <img src={arrow_icon} alt="Arrow icon" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
