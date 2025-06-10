import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useVerifyOtp } from '../../Hooks/useVerifyOtp';

const ForgetPass = () => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const navigate = useNavigate();
    const { isVerifying, error, verifyOtp} = useVerifyOtp()
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (otp.includes('')) {
            toast.error('Please enter all 6 digits of the OTP.');
            return;
        }
        const email = sessionStorage.getItem('email')
        // const rawStoredOtp = sessionStorage.getItem('otp');
        // const storedOtp = rawStoredOtp ? rawStoredOtp.trim() : null;
        const enteredOtp = otp.join('').trim();
        
        const success = await verifyOtp(email, enteredOtp)
        if (success) {
            toast.success("OTP verified successfully!")
            setTimeout(() => {
                navigate("/newPassword")
            }, 2000)
        }
        else { 
            toast.error('Invalid or expired Otp!')
        }
    };

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return;

        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);

        if (element.value && element.nextSibling) {
        element.nextSibling.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace') {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);

        if (e.target.previousSibling) {
            e.target.previousSibling.focus();
        }
        }
    };

    const handleBackToLogin = () => { 
        navigate("/login")
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
            <div className="form-container">
                <ToastContainer/>
                    <div className="verification-section">
                    <img 
                        src="https://res.cloudinary.com/dr9yx1tod/image/upload/v1748900962/yal7ljeoyp3gokx1d3uo.png" 
                        alt="Verification" 
                        className="verification-image"
                        />
                        <h1 className="verification-title">Verify that's you 👀</h1>
                        <p className="verification-subtitle">
                        we have sent OTP code to your email<br />
                        Please check your email now!
                        </p>
                        <p className="verification-instruction">
                        Enter the verification code we just<br />
                        sent on your email address
                        </p>
                    {error && <div className="error">{ error}</div> }
                        <form onSubmit={handleSubmit}>
                            <div className="otp-container">
                            {otp.map((digit, index) => (
                                <input
                                key={index}
                                type="text"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(e.target, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                className="otp-input"
                                />
                            ))}
                            </div>
                        <button disabled={isVerifying} className="verify-button">{ isVerifying? "verifying...": "Verify"}</button>
                    </form>

                    <div className="separator"></div>
                    <button className="back-button" onClick={handleBackToLogin}>Back to Login</button>
                </div>
            </div>
        </div>
    );
};

export default ForgetPass;

