import { useTechnicianContext } from "./useTechnicianContext"
export const useTechnicianLogout = () => { 
    const { dispatch } = useTechnicianContext()

    const technicianLogout = async () => {

        // using dispatch to access logout state
        dispatch({ type: 'LOGOUT' })
        
    }
    return {technicianLogout}
}