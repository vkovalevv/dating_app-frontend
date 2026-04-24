import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from '../api/axiosInstance';

function LocationPage() {
    const [status, setStatus] = useState('idle') // idle | loading | success | error
    const [checking, setChecking] = useState(true)
    const navigate = useNavigate()

    const getLocation = () => new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })


    useEffect(() => {
        const checkLocation = async () => {
            const response = await api.get('/users/me')
            console.log('user data:', response.data)
            if (response.data.latitude != null) {
                navigate('/preferences')
            } else {
                setChecking(false)
            }
        }
        checkLocation()
    }, [])

    const onSubmit = async () => {
        setStatus('loading')
        try {
            const position = await getLocation()
            await api.put('/users/update-location', {
                'longitude': position.coords.longitude, 'latitude': position.coords.latitude
            })
            setStatus('success')
        } catch (err) {
            await api.put('/users/update-location', {
                longitude: 24.9384,
                latitude: 60.1699
            })
            setStatus('success') // fallback for development
        }

    } // get user location and send to update location endpoint
    useEffect(() => {
        if (status === 'success') {
            navigate('/preferences')
        }
    }, [status])
    if (checking) return <p>Loading...</p>
    return (<>
        {status === 'idle' &&
            <button
                onClick={() => onSubmit()}
                className="px-4 py-2 rounded-xl bg-blue-400 text-white text-sm disabled:opacity-40">
                Share location
            </button>
        }
        {status === 'loading' &&
            <p className="...">
                Getting location...
            </p>
        }
        {status === 'error' &&
            <p className="...">
                Location denied, pleace allow access
            </p>}
    </>)
}
export default LocationPage;

