import React, {useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useWindowsErrors } from '../../Hooks/windowsErrorsHooks/useWindowsError';

const WindowsErrors1 = () => {
  const [errorCode, setErrorCode] = useState('')
  const {error, isLoading, getWindowsError} = useWindowsErrors()
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
      e.preventDefault()
      const getErrorSuccess = await getWindowsError(errorCode)
  
    if (!getErrorSuccess) {
      console.log("failed fetching error code!")
      return
    }
        navigate(`/windows-errors2?code=${encodeURIComponent(errorCode)}`);
        localStorage.removeItem('errorCode')
  };

  return (
    <div className="content-container">
      <div className="search-container-error">
      <h1 className="DIVO-logo-error"><span className="orange-text">D</span>IVO</h1>
        {error && <div className="error">{ error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="search-box-container-error">
          <div className="search-input-error">
            <input 
              type="text" 
              placeholder="Example 0x00240007"
                value={errorCode}
                onChange={(e)=> setErrorCode(e.target.value)}
              />
          </div>
            <button disabled={isLoading } className="search-button">SEARCH</button>
            </div>
        </form>

      <div className="cards-container">
        <div className="card">
          <h3>How to fix the blue screen of death error in windows 10</h3>
          <div className="image-container">
            <img src="https://res.cloudinary.com/dr9yx1tod/image/upload/v1748903536/hnrn8kxcjtzipdlp2mo9.png" alt="Blue screen" />
          </div>
          <div className="card-footer">
            <img src="https://res.cloudinary.com/dr9yx1tod/image/upload/v1748903653/cqfmjmak8pe5pvzxh2v2.png" alt="Group icon" />
          </div>
        </div>

        <div className="card">
          <h3>Error Messages in Windows 7</h3>
          <div className="image-container">
            <img src="https://res.cloudinary.com/dr9yx1tod/image/upload/v1748903591/kqlcxxtei1fqnfmfkm2l.png" alt="Error message" />
          </div>
          <div className="card-footer">
            <img src="https://res.cloudinary.com/dr9yx1tod/image/upload/v1748903653/cqfmjmak8pe5pvzxh2v2.png" alt="Group icon" />
          </div>
        </div>

        <div className="card">
          <h3>Windows XP error</h3>
          <div className="image-container">
            <img src="https://res.cloudinary.com/dr9yx1tod/image/upload/v1748903624/lmctaeyfanryyusiouwy.png" alt="Windows XP error" />
          </div>
          <div className="card-footer">
            <img src="https://res.cloudinary.com/dr9yx1tod/image/upload/v1748903653/cqfmjmak8pe5pvzxh2v2.png" alt="Group icon" />
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default WindowsErrors1;

