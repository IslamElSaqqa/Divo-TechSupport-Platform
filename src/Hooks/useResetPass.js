import { useState } from 'react'
import { useAuthContext} from'../Hooks/useAuthContext'
export const useResetPass = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const resetPassword = async (newPassword, confirmPassword) => {
        setIsLoading(true);
        setError(null);

        // extracting token from sessionStorage to secure routes
        const token = sessionStorage.getItem('resetToken')

        const response = await fetch('/api/auth/reset-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token, newPassword, confirmPassword }),
        });

        const json = await response.json();

        if (!response.ok) {
            // Show backend error message on screen
            setError(json.error || 'Something went wrong!');
            setIsLoading(false);
            return false;
        }

        if (response.ok) {
            dispatch({ type: 'RESET_PASSWORD', payload: json });
            return true;
        }
    };

    return { isLoading, error, resetPassword };
};
