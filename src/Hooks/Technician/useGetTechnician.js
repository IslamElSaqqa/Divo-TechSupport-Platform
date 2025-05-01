import { useState } from 'react';
import { useTechnicianContext } from '../../Hooks/Technician/useTechnicianContext';

import { jwtDecode } from "jwt-decode";

export const useGetTechnicianContext = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false); 
    const { dispatch } = useTechnicianContext();

    const GetTechnicianById = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const token = sessionStorage.getItem("Technician")
                ? JSON.parse(sessionStorage.getItem("Technician")).token : null;
            
            // Decode the token to get the technician ID
            const decoded = jwtDecode(token);
            const technicianId = decoded._id;  

            console.log("Technician ID:", technicianId);
            
            const response = await fetch(`/api/specialists/${technicianId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${token}`   
                },
            });

            const json = await response.json();

            if (!response.ok) {
                setError(json.error || 'Something went wrong');
                return false;
            }

            dispatch({ type: 'GET_TECHNICIAN', payload: json});
            return true;
        } catch (err) {
            setError('Network error or unexpected issue');
            return false;
        } finally {
            setIsLoading(false); 
        }
    };

    return { isLoading, error, GetTechnicianById};
};
