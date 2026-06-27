import { useState } from 'react';
import { useAuthContext } from '../useAuthContext';

export const useUpdateComment = () => {
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
    const [errorUpdate, setErrorUpdate] = useState(null);
    const { user } = useAuthContext();

    const updateComment = async (postId, commentId, content) => {
        if (!user) {
            setErrorUpdate('User not authenticated');
            return false;
        }

        setIsLoadingUpdate(true);
        setErrorUpdate(null);

        try {
            const response = await fetch(`/api/community/posts/${postId}/comments/${commentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ content })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to update comment');
            }

            return true;
        } catch (error) {
            setErrorUpdate(error.message);
            return false;
        } finally {
            setIsLoadingUpdate(false);
        }
    };

    return { updateComment, isLoadingUpdate, errorUpdate };
};