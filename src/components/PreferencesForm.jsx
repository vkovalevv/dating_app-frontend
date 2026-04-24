import React, { useState, useEffect } from "react";
import api from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function PreferencesForm() {
    const [age, setAge] = useState(18);
    const [gender, setGender] = useState('');
    const [maxDistance, setMaxDistance] = useState(30);
    const [hasPreferences, setHasPreferences] = useState(null);
    const navigate = useNavigate()

    useEffect(() => {
        api.get('/users/me/preferences')
            .then((res) => {
                setHasPreferences(true)
                setAge(res.data.age)
                setGender(res.data.gender)
                setMaxDistance(res.data.max_distance)
            })
            .catch(() => setHasPreferences(false))
    }, [])
    
    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            if (hasPreferences) {
                await api.put('/preferences/update-preference', { age, gender, max_distance: maxDistance })
            } else {
                await api.post('/preferences/create-preference', { age, gender, max_distance: maxDistance })
                setHasPreferences(true)
            }
            console.log('navigating to swipes')
            window.location.href = '/swipes'
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className='flex w-full h-screen items-center justify-center'>
            <form
                className="flex flex-col gap-4 w-full max-w-md mx-auto bg-gray-300 rounded-xl shadow-sm p-6"
                onSubmit={handleSubmit}
            >
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium" htmlFor="age">Age:</label>
                    <input className="border rounded px-3 py-2 w-full" type="number" id="age" value={age} onChange={e => setAge(e.target.value)} required />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium" htmlFor="gender">Gender:</label>
                    <input className="border rounded px-3 py-2 w-full" type="text" id="gender" value={gender} onChange={e => setGender(e.target.value)} required />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium" htmlFor="maxDistance">Max distance:</label>
                    <input className="border rounded px-3 py-2 w-full" type="number" id="maxDistance" value={maxDistance} onChange={e => setMaxDistance(e.target.value)} required />
                </div>
                <button type="submit" className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors">
                    {hasPreferences ? 'Update preferences' : 'Set preferences'}
                </button>
            </form>
        </div>
    )
}