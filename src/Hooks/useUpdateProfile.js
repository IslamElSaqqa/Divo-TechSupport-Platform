import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
// Create a useSignup hook
export const useUpdateProfile =  () => { 
    // define Error and updateLoading States to track errors and time loading requests
    const [UpdateError, setUpdateError] = useState(null)
    const [updateLoading, setUpdateLoading] = useState(null)

    const { dispatch } = useAuthContext()
    const { user } = useAuthContext()
    const updateProfile = async (formData) => {
        
        // tracking error states
        setUpdateLoading(true)
        setUpdateError(null)
        const userId = user?._id;

        // creating The API using fetch 
        const response = await fetch(`/api/users/${userId}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formData)
        })
        const json = await response.json()

        // check the response status
        if (!response.ok) { 
            setUpdateLoading(false)
            setUpdateError(json.error)

            // return false to indicate that there is an error in the response
            return false;
        }

        if (response.ok) { 
            
            // update auth context using dispatch from useReducer
            const userData = json.updatedUser;
            console.log(userData)
            setUpdateLoading(false); 

            dispatch({ type: 'UPDATE_PROFILE', payload: { ...userData } })
            return userData;
        }
            
    }
    return {updateLoading, UpdateError, updateProfile}
}