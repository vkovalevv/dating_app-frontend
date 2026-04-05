  import React, { useState } from 'react';
  import { Button } from 'antd';
  import api from '../api/axiosInstance';
  import { useNavigate } from 'react-router-dom';

  function LoginForm({ onSuccess }) {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); //  for showing erros for users 

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError(''); // reset errors before start
      try {
        const formData = new URLSearchParams()

        formData.append('username', email)
        formData.append('password', password)

        const response = await api.post('/users/token', formData);

        localStorage.setItem('access_token', response.data.access_token)
        localStorage.setItem('refresh_token', response.data.refresh_token)

        onSuccess();

        console.log('requesting geolocation')
        navigator.geolocation.getCurrentPosition((position)=>{
        console.log('got position', position)
          api.put('/users/update-location',{latitude:position.coords.latitude, longitude:position.coords.longitude})
        },
          (err) => {console.error(err)})

        navigate('/preferences')
      } catch (err) {
        console.error(err)
        setError('Wrong email or password');
      }
    };

    return (
      <form className="flex flex-col gap-4 w-full max-w-md mx-auto bg-gray-300 rounded-xl shadow-sm p-6"
        onSubmit={handleSubmit}>
        <h2 className="text-xl font-semibold text-center">Log in</h2>
        {error && (
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}
        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email:</label>
          <input className="border rounded px-3 py-2 w-full" type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password">Password:</label>
          <input className="border rounded px-3 py-2 w-full" type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>

        <Button htmlType="submit" type="primary">Log in</Button>
      </form>
    );
  }

  export default LoginForm;