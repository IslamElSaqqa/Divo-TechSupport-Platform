import { useState, useEffect } from 'react';
import { useAuthContext } from './useAuthContext';

export const useGetProfile = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { user, dispatch } = useAuthContext();
    
    const getProfile = async () => {
        setIsLoading(true);
        setError(null);

        // Safely access user token and userId from normalized user data
        const token = user?.token;
        const userId = user?._id;
        
        if (!token || !userId) {
        setError("User is not properly authenticated.");
        setIsLoading(false);
        return false;
        }

        try {
        const response = await fetch(`/api/users/${userId}`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
            },
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.error || 'Something went wrong');
            return false;
        }

        console.log("Fetched profile:", json);
        const userData = json.user;

        // Dispatch user data for profile with token
        dispatch({
            type: 'GET_PROFILE',
            payload: { ...userData, token }  // add token back if needed
        });

        return userData;
        } catch (err) {
        setError('Network error or unexpected issue');
        return false;
        } finally {
        setIsLoading(false);
        }
    };

    return { isLoading, error, getProfile };
};
