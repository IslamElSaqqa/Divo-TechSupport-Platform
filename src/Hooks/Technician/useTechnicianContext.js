import { useContext } from 'react'
import { TechnicianAuthContext} from '../../context/AuthContext/TechnicianAuthContext'

export const useTechnicianContext = () => { 
    const context = useContext(TechnicianAuthContext)

    // check on context if exists
    if (!context)
        throw Error('useTechnicianContext must be used inside TechnicianContextProvider')

    return context;
}