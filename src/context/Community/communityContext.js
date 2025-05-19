import { createContext, useReducer } from 'react'

export const CommunityContext = createContext()
export const communityReducer = (state, action) => {
    switch (action.type) {
        case "CREATE_POSTS":
            return {
                // spreading states
                ...state,
                posts: [action.payload, ...state.posts],
            }
        case "SET_POST":
            return {
                posts: Array.isArray(action.payload) ? action.payload : []
            }
        case 'ADD_POSTS':
            return {
                ...state,
                posts: [...state.posts, ...action.payload],
            };
        case 'DELETE_POSTS':
            return {
                ...state,
                posts: state.posts.filter((p)=> p._id !== action.payload._id)
            }
        case 'UPDATE_POST':
            return {
                ...state,
                posts: state.posts.map((post) =>
                post._id === action.payload.postId
                    ? { ...post, content: action.payload.content } : post
        ),
            };
        case 'LIKE_POST':
            return {
                ...state,
                posts: state.posts.map(post =>
                    post._id === action.payload.postId
                        ? {
                            ...post,
                            likes: action.payload.likes,
                            likedBy: action.payload.likedBy
                            } : post
                ),
            }

    case 'ADD_COMMENT':
    return {
        ...state,
        posts: state.posts.map((post) =>
            post._id === action.payload.postId
                ? {
                    ...post,
                    comments: [...(post.comments || []), action.payload.comment], // Update post.comments
                }
                : post
        ),
        commentsByPost: {
            ...state.commentsByPost,
            [action.payload.postId]: [
                ...(state.commentsByPost?.[action.payload.postId] || []),
                action.payload.comment,
            ], 
        },
    };

        case 'GET_POST_COMMENTS':
            return {
                ...state,
                commentsByPost: {
                    ...state.commentsByPost,
                    [action.payload.postId]: action.payload.comments
                },
            };

        default:
            return state
    }
}

// create a custom context using useReducer to share global user states
export const CommunityContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(communityReducer,
        { posts: []})
        console.log('context state: ', state)

    return (
        // passing props to the provider to wrap
        <CommunityContext.Provider value={{ ...state, dispatch }}>
            { children}
        </CommunityContext.Provider>
    )
}

// import { createContext, useReducer } from 'react';

// // Create the context
// export const CommunityContext = createContext();

// // Reducer function to manage community state
// export const communityReducer = (state, action) => {
//     switch (action.type) {
//         // Add a new post
//         case 'CREATE_POST':
//         return {
//             ...state,
//             posts: [action.payload, ...state.posts],
//         };

//         // Set posts (typically on initial load)
//         case 'SET_POST':
//         return {
//             ...state,
//             posts: Array.isArray(action.payload) ? action.payload : [],
//         };

//         // Append more posts (pagination)
//         case 'ADD_POSTS':
//         return {
//             ...state,
//             posts: [...state.posts, ...action.payload],
//         };

//         // Delete a post
//         case 'DELETE_POST':
//         return {
//             ...state,
//             posts: state.posts.filter((p) => p._id !== action.payload._id),
//         };

//         // Update post content
//         case 'UPDATE_POST':
//         return {
//             ...state,
//             posts: state.posts.map((post) =>
//             post._id === action.payload.postId
//                 ? { ...post, content: action.payload.content }
//                 : post
//             ),
//         };

//         // Toggle like state on a post
//         case 'LIKE_POST':
//         return {
//             ...state,
//             posts: state.posts.map((post) =>
//             post._id === action.payload.postId
//                 ? {
//                     ...post,
//                     likes: action.payload.likes,
//                     likedBy: action.payload.likedBy,
//                 }
//                 : post
//             ),
//         };
        
//         case 'ADD_COMMENT':
//             return {
//                 ...state,
//                 posts: state.posts.map((post) =>
//                 post._id === action.payload.postId
//                     ? {
//                         ...post,
//                         comments: [...(post.comments || []), action.payload.comment],
//                         commentsByPost: {
//                         ...state.commentsByPost,
//                             [action.payload.postId]: [
//                                 ...(state.commentsByPost?.[action.payload.postId] || []),
//                                 action.payload.comment,
//                             ],
//                         },
//                         }
//                     : post
//                 ),
//             };

//         // Set all comments for a specific post
//         case 'GET_POST_COMMENTS':
//         return {
//             ...state,
//             commentsByPost: {
//             ...state.commentsByPost,
//             [action.payload.postId]: action.payload.comments,
//             },
//         };

//         default:
//         return state;
//     }
//     };

//     // Provider component to wrap the app and provide state
//     export const CommunityContextProvider = ({ children }) => {
//     const initialState = {
//         posts: [],
//         commentsByPost: {},
//         };
//     const [state, dispatch] = useReducer(communityReducer, initialState);
//         console.log('context state: ', state)

//     return (
//         <CommunityContext.Provider value={{ ...state, dispatch }}>
//         {children}
//         </CommunityContext.Provider>
//     );
// };
