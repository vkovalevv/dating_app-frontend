import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../api/axiosInstance";

function ProtectedRoute({ childrenComponent, requirePreferences = false }) {
    const isAuth = !!localStorage.getItem('access_token')
    const [hasPreferences, setHasPreferences] = useState(null)

    useEffect(() => {
        api.get("/users/me/preferences")
            .then(() => setHasPreferences(true))
            .catch((err) => { if (err.response?.status == 404) setHasPreferences(false) })
    }, [])

    if (!isAuth) return <Navigate to='/auth' />
    if (hasPreferences === null) return <div>Updating</div>
    if (!hasPreferences && requirePreferences) return < Navigate to = '/preferences' />

    return childrenComponent
};

export default ProtectedRoute;