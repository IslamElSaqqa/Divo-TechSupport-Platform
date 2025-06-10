import { useState } from 'react'
import { useAuthContext} from'../Hooks/useAuthContext'
export const useVerifyOtp = () => {
    const [error, setError] = useState(null);
    const [isVerifying, setIsVerifying] = useState(false);
    const { dispatch } = useAuthContext();

    const verifyOtp = async (email, otp) => {
        setIsVerifying(true);
        setError(null);

        const response = await fetch('/api/auth/verify-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, otp}),
        });

        const json = await response.json();

        if (!response.ok) {
            // Show backend error message on screen
            setError(json.error || 'Invalid OTP');
            setIsVerifying(false);
            return false;
        }

        if (response.ok) {
            sessionStorage.setItem('resetToken', json.token)
            dispatch({ type: 'VERIFY_OTP', payload: json });
            return true;
        }
    };

    return { isVerifying, error, verifyOtp };
};
