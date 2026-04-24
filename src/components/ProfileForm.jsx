import React, { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import { useId } from "react";
import Upload from "./Upload";

function ProfileForm() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    api.get('/users/me')
      .then((res) => { setUser(res.data) })
      .catch((err) => { console.error(err) })
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    api.patch('/users/me/update-info', user)
      .then((res) => { console.log(res) })
      .catch((err) => { console.error(err) })
  }

  return (
    <div className='flex w-screen h-screen items-center justify-center'>
      {user &&
        <form
          className="flex flex-col gap-4 w-full max-w-md mx-auto bg-gray-300 rounded-xl shadow-sm p-6"
          onSubmit={handleSubmit}
        >
          <p>{user.email}</p>
          <Upload/>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium" htmlFor="user.first_name">First name:</label>
            <input className="border rounded px-3 py-2 w-full" type="text" id="user.first_name" value={user.first_name} onChange={e => setUser({ ...user, first_name: e.target.value })} required />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium" htmlFor="user.last_name">Last name:</label>
            <input className="border rounded px-3 py-2 w-full" type="text" id="user.last_name" value={user.last_name} onChange={e => setUser({ ...user, last_name: e.target.value })} required />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium" htmlFor="user.age">Age:</label>
            <input className="border rounded px-3 py-2 w-full" type="number" id="user.age" value={user.age} onChange={e => setUser({ ...user, age: e.target.value })} required />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium" htmlFor="user.gender">Gender:</label>
            <input className="border rounded px-3 py-2 w-full" type="text" id="user.gender" value={user.gender} onChange={e => setUser({ ...user, gender: e.target.value })} required />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium" htmlFor="user.description">Description:</label>
            <input className="border rounded px-3 py-2 w-full" type="text" id="user.description" value={user.description} onChange={e => setUser({ ...user, description: e.target.value })} required />
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors">
            Update profile
          </button>
        </form>
      }
      
    </div>
  )
}

export default ProfileForm;
