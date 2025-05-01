import { useContext } from 'react'
import { onlineServiceContext} from '../../context/OnlineServicing/onlineServicingContext'

export const useOnlineServiceContext = () => { 
    const context = useContext(onlineServiceContext)

    // check on context if exists
    if (!context)
        throw Error('useOnlineServiceContext must be used inside onlineServiceContextProvider')

    return context;
}