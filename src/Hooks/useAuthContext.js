import { useContext } from 'react'
import { AuthContext} from '../context/AuthContext/AuthContext'

export const useAuthContext = () => { 
    const context = useContext(AuthContext)

    // check on context if exists
    if (!context)
        throw Error('useAuthContext must be used inside AuthContextProvider')

    return context;
}