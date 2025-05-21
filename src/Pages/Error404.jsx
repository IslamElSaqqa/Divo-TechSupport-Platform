import React from 'react';
import { useNavigate } from 'react-router-dom';

const Error404 = () => {
    const navigate = useNavigate();

    const handleNavigate = () =>{
        navigate('/home')
    }
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404 Not Found</h1>
      <p className="not-found-message">Your visited page not found. You may go home page.</p>
      <button className="home-button-404" onClick={handleNavigate}>
        Back to home page
      </button>
    </div>
  );
};

export default Error404;
