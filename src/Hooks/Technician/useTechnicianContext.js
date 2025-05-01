import { useContext } from 'react'
import { TechContext} from '../../context/Technician/technicianContext'

export const useTechnicianContext = () => { 
    const context = useContext(TechContext)

    // check on context if exists
    if (!context)
        throw Error('useTechnicianContext must be used inside TechnicianContextProvider')

    return context;
}

