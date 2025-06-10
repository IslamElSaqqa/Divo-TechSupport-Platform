import { useState, useContext } from 'react';
import { useAuthContext } from '../useAuthContext';
import { CommunityContext } from '../../context/Community/communityContext';


export const useDeleteComment = () => {
    const { dispatch } = useContext(CommunityContext);
    const [isLoadingDelete, setIsLoadingDelete] = useState(false);
    const [errorDelete, setErrorDelete] = useState(null);
    const { user } = useAuthContext();

    const deleteComment = async (postId, commentId) => {
        if (!user) {
            setErrorDelete('User not authenticated');
            return false;
        }

        setIsLoadingDelete(true);
        setErrorDelete(null);

        try {
            const response = await fetch(`/api/community/posts/${postId}/comments/${commentId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to delete comment');
            }

            dispatch({
                type: 'DELETE_COMMENT',
                payload: {
                    postId,
                    commentId,
                },
            });
            console.log("Dispatched Delete");

            return true;
        } catch (error) {
            setErrorDelete(error.message);
            return false;
        } finally {
            setIsLoadingDelete(false);
        }
    };

    return { deleteComment, isLoadingDelete, errorDelete };
};