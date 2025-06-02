import { useContext } from 'react'
import { WindowErrorsContext} from '../../context/WindowsErrors/windowsErrorsContext'

export const useWindowsErrorsContext = () => { 
    const context = useContext(WindowErrorsContext)

    // check on context if exists
    if (!context)
        throw Error('useWindowsErrorsContext must be used inside WindowsErrrorsContextProvider')

    return context;
}

