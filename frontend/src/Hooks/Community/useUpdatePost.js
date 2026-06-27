import { useState } from 'react'
import { useCommunityContext } from '../Community/useCommunityContext'
import { useAuthContext } from "../useAuthContext"

export const useUpdatePost = () => { 
    const [updateError, setUpdateError] = useState(null)
    const [isUpdateLoading, setIsUpdateLoading] = useState(false)
    const { user } = useAuthContext()
    const { dispatch } = useCommunityContext()

    const updatePost = async (postId, newContent) => {
        setIsUpdateLoading(true)
        setUpdateError(null)

        try {
            const token = user?.token;

            const response = await fetch(`/api/community/posts/${postId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
                body:JSON.stringify({ content: newContent })
            })

            const json = await response.json()

            if (!response.ok) {
                setUpdateError(json.error || "Failed to update post")
                return false
            }

            dispatch({ type: 'UPDATE_POST', payload: json.post })
            return true

        } catch (e) {
            setUpdateError("Something went wrong")
            return false
        }
        finally {
        setIsUpdateLoading(false)
        }
    }

    return { isUpdateLoading, updateError, updatePost }
}