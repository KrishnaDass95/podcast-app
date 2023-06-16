import {useAuthState} from "react-firebase-hooks/auth"
import { auth } from "../../firebase";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {

    // this hook gets the user auth state from firebase db, very helpful
    // to add loading state when its retrieiving and if success or failure we can show the
    // UI accordingly 
    const [user, loading, error] = useAuthState(auth)
    
    if(loading){
        return <p>Loading....</p>
    }
    else if(!user || error){
        return <Navigate to="/" replace />
    }
    else{
        return <Outlet />
    }
}

export default PrivateRoutes;