import { useState } from 'react'
import { useTechnicianContext } from './useTechnicianContext'

export const useTechnicianLogin =  () => { 

    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const { dispatch } = useTechnicianContext()
    const technicianLogin = async (email, password) => {
        
        // tracking error states
        setIsLoading(true)
        setError(null)

        try {
            // creating The API using fetch 
            const response = await fetch('/api/specialists/login', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            })
            const json = await response.json()

            // check the response status
            if (!response.ok) {
                setIsLoading(false)
                setError(json.error || 'Error Logging in!')
                return false;
            }

            if (response.ok) {
            
                const normalizedTechnician = {
                    _id: json.specialistId,
                    email: json.email,
                    token: json.token,
                    name: json.specialistName
                };
            
                // save the user to session storage in key value pairs
                sessionStorage.setItem('Technician', JSON.stringify(normalizedTechnician));
                dispatch({ type: 'LOGIN', payload: normalizedTechnician })
                return true;
            }
        } catch (err) {
                setError('Network error or unexpected issue');
                return false;
        } finally {
            setIsLoading(false);
        }
            
    }
    return {isLoading, error, technicianLogin}
}