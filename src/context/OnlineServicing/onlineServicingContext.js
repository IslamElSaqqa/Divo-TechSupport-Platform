import { createContext, useReducer } from 'react'

// Create an RepairShopsContext instance from createContext
export const onlineServiceContext = createContext()
export const onlineServiceReducer = (state, action) => {
    switch (action.type) { 
        case "CREATE_SESSION":
            return {
                ...state,
                helpSessions: Array.isArray(state.helpSessions)
                ? [...state.helpSessions, action.payload] : [action.payload]
            } // updated spreading states
        default:
            return state
    }
}

// create a custom context using useReducer to share global user states
// authReducer is a func that defines all user states
export const OnlineServiceContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(onlineServiceReducer,
        { helpSessions: [] })
        console.log('context state: ', state)

    return (
        // passing props to the provider to wrap 
        <onlineServiceContext.Provider value={{ ...state, dispatch }}>
            { children}
        </onlineServiceContext.Provider>
    )
}