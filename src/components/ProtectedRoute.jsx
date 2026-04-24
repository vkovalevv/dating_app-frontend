import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../api/axiosInstance";

function ProtectedRoute({ children, requirePreferences = false }) {
    const isAuth = !!localStorage.getItem('access_token')
    const [hasPreferences, setHasPreferences] = useState(requirePreferences?null:true)


    useEffect(() => {
        if(requirePreferences){
            api.get("/users/me/preferences")
            .then(() => {setHasPreferences(true)
              console.log('preferences OK')
            })
            .catch((err) => { 
              console.log('preferences ERROR', err.response?.status)
              setHasPreferences(false)})
        }
    }, [])

    if (!isAuth) return <Navigate to='/auth' />
    if (hasPreferences === null) return <div>Updating</div>
    if (!hasPreferences && requirePreferences) return < Navigate to = '/preferences' />

    console.log('navigate to children')
    return children
};

export default ProtectedRoute;