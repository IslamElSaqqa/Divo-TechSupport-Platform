import { useState } from 'react';
import { useOnlineServiceContext } from './useOnlineServicingContext';
import { useAuthContext } from "../useAuthContext"
export const useOnlineService = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false); 
    const { user } = useAuthContext()
    const { dispatch } = useOnlineServiceContext();

    const createOnlineService = async (sessionData) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/helpSession', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${user.token}`   
                },
                body: JSON.stringify(sessionData),
            });

            const json = await response.json();

            if (!response.ok) {
                setError(json.error || 'Something went wrong');
                return false;
            }
            // save the user to local storage in key value pairs
            localStorage.setItem('Help_session_info', JSON.stringify(json))
            dispatch({ type: 'CREATE_SESSION', payload: json});
            return true;
        } catch (err) {
            setError('Network error or unexpected issue');
            return false;
        } finally {
            setIsLoading(false); 
        }
    };

    return { isLoading, error, createOnlineService};
};
