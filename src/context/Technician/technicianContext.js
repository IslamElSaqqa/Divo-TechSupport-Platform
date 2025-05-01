import { createContext, useReducer } from 'react'

// Create an AuthContext instance from createContext
export const TechContext = createContext()
export const techReducer = (state, action) => {
    switch (action.type) { 
        case 'GET_TECHNICIAN':
            return {
                technician: action.payload,
                ...state
            }
        case 'LOGIN':
            return {
                type: action.payload
            }
        default:
            return state
    }
}

// create a custom context using useReducer to share global tech states
// TechReducer is a func that defines all tech states
export const TechContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(techReducer,
        { technician: null })
    console.log('context state: ', state)
    // useEffect(() => {
    //     const user = JSON.parse(sessionStorage.getItem('user'))
    //     dispatch({type: 'LOGIN', payload: user})
    // }, [dispatch])

    return (
        // passing props to the provider to wrap 
        <TechContext.Provider value={{ ...state, dispatch }}>
            { children}
        </TechContext.Provider>
    )
}