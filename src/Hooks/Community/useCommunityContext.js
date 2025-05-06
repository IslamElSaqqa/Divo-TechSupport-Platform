import { useContext } from 'react'
import { CommunityContext} from '../../context/Community/communityContext'

export const useCommunityContext = () => { 
    const context = useContext(CommunityContext)

    // check on context if exists
    if (!context)
        throw Error('useCommunityContext must be used inside CommunityContextProvider')

    return context;
}