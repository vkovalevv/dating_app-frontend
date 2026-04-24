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
    if (checking) return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <p className="text-gray-500">Loading...</p>
        </div>
    )

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="bg-white border border-gray-200 rounded-2xl p-10 max-w-sm w-full text-center">
                <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-6">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                        <circle cx="12" cy="9" r="2.5" />
                    </svg>
                </div>
                <h2 className="text-lg font-medium mb-2">Share your location</h2>
                <p className="text-sm text-gray-500 mb-8 leading-relaxed">
                    We need your location to show you people nearby. Your location is never shared with other users.
                </p>
                {status === 'idle' && (
                    <button onClick={onSubmit} className="w-full py-2.5 bg-blue-50 text-blue-600 font-medium rounded-lg hover:bg-blue-100 transition-colors">
                        Allow location
                    </button>
                )}
                {status === 'loading' && (
                    <p className="text-sm text-gray-500">Getting location...</p>
                )}
                {status === 'error' && (
                    <p className="text-sm text-red-500">Location denied, please allow access</p>
                )}
            </div>
        </div>
    )
}
export default LocationPage;

