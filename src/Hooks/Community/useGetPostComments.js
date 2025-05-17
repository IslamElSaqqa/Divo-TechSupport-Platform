import { useState } from 'react'
import { useCommunityContext } from '../Community/useCommunityContext'

// Create a useSignup hook
export const useGetPostComments =  () => { 
    // define ErrorGetComments and IsLoading States to track errorGetCommentss and time loading requests
    const [errorGetComments, setErrorGetComments] = useState(null)
    const { dispatch } = useCommunityContext()

    const getPostComments = async (postId, page = 1, limit = 10) => {
        
        // tracking errorGetComments states
        setErrorGetComments(null)
        try {
            // creating The API using fetch 
            const response = await fetch(`/api/community/posts/${postId}/comments?page=${page}&limit=${limit}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const json = await response.json()

            // check the response status
            if (!response.ok) {
                setErrorGetComments(json.message || "Failed to fetch comments")
                return false;
            }

            if (response.ok) {
                sessionStorage.setItem('Post_Comments', JSON.stringify(json.data))
                dispatch({ type: 'GET_POST_COMMENTS',  payload: { postId, comments: json.data } })
                return true;
            }
        } catch (e) {
            setErrorGetComments("Something went wrong", e.message);
            return false;
        } 
            
    }
    return { errorGetComments, getPostComments}
}