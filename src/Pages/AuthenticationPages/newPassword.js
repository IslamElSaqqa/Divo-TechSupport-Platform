import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useResetPass } from '../../Hooks/useResetPass';
import 'react-toastify/dist/ReactToastify.css';

const Newpassword = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('') 
  const [confPassword, setConfPassword] = useState('')
  const { error, isLoading, resetPassword } = useResetPass()
  
  const handleSubmit = async (e) => { 
    e.preventDefault()
    const success = await resetPassword(newPassword, confPassword)
    if (success) {
      sessionStorage.removeItem('email')
      sessionStorage.removeItem('otp')
      sessionStorage.removeItem('resetToken')
      navigate('/pass-changed')
    } 
    else { 
      console.log('failed to reset password')
      return;
    }
}
  return (
    <div className="content-container">
        <div className="side-image">
        <img 
            src="https://res.cloudinary.com/dr9yx1tod/image/upload/v1748886577/p7mn9byalpc5ze8zh4rh.png" 
            alt="Repair Service" 
            className="repair-image"
        />
        </div>
        
        <div className="content-wrapper">
        <div className="icon-section">
            <img src="https://res.cloudinary.com/dr9yx1tod/image/upload/v1748901081/oynyxlod89ejjqblklhu.png" alt="Lock Icon" className="lock-icon" />
        </div>
        <form onSubmit={handleSubmit}>
            <div className="header-section">
            <h1>Enter Your New Password</h1>
            <p className="description">
                Create a new password for your account</p>
          </div>
          {error && <div className='error'>{ error}</div>}
            <div className="input-section">
            <div className="input-wrapper">
                <input
                type="password"
                placeholder="Password"
                value={newPassword}
                onChange={(e)=> setNewPassword(e.target.value)}
                />
                <img src="https://res.cloudinary.com/dr9yx1tod/image/upload/v1748901126/g5izwq10biktbpxra4ze.png" alt="password" className="email-icon" />
            </div>
            <div className="input-wrapper">
                <input
                type="password"
                placeholder="Confirm Password"
                value={confPassword}
                onChange={(e)=> setConfPassword(e.target.value)}
                />
                <img src="https://res.cloudinary.com/dr9yx1tod/image/upload/v1748901126/g5izwq10biktbpxra4ze.png" alt="password" className="email-icon" />
            </div>
            
            </div>
            <button disabled={isLoading} className="verify-button">
                {isLoading ? "Resetting new password ..." : "Submit"}
              
            </button>
          </form>
        </div>
        </div>
    );
};
export default Newpassword;