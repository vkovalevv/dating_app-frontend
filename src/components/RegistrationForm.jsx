import React, { useState } from 'react';
import { Form, Button } from 'antd';
import api from '../api/axiosInstance';

function RegistrationForm() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstname] = useState('');
  const [secondName, setSecondname] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState(18);
  const [gender, setGender] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await api.post('/users', {
        email,
        password,
        first_name: firstName,
        last_name: secondName,
        gender,
        age,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='flex w-screen h-screen items-center justify-center'>
      <form
        className="flex flex-col gap-4 w-full max-w-md mx-auto bg-gray-300 rounded-xl shadow-sm p-6"
        onSubmit={handleSubmit}
      >
        <Form.Item className="flex flex-col gap-1">
          <label className="text-sm font-medium" htmlFor="email">Email:</label>
          <input className="border rounded px-3 py-2 w-full" type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </Form.Item>
        <Form.Item className="flex flex-col gap-1">
          <label className="text-sm font-medium" htmlFor="firstName">First name:</label>
          <input className="border rounded px-3 py-2 w-full" type="text" id="firstName" value={firstName} onChange={e => setFirstname(e.target.value)} required />
        </Form.Item>
        <Form.Item className="flex flex-col gap-1">
          <label className="text-sm font-medium" htmlFor="secondName">Second name:</label>
          <input className="border rounded px-3 py-2 w-full" type="text" id="secondName" value={secondName} onChange={e => setSecondname(e.target.value)} required />
        </Form.Item>
        <Form.Item className="flex flex-col gap-1">
          <label className="text-sm font-medium" htmlFor="password">Password:</label>
          <input className="border rounded px-3 py-2 w-full" type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </Form.Item>
        <Form.Item className="flex flex-col gap-1">
          <label className="text-sm font-medium" htmlFor="age">Age:</label>
          <input className="border rounded px-3 py-2 w-full" type="number" id="age" value={age} onChange={e => setAge(Number(e.target.value))} required />
        </Form.Item>
        <Form.Item className="flex flex-col gap-1">
          <label className="text-sm font-medium" htmlFor="gender">Gender:</label>
          <input className="border rounded px-3 py-2 w-full" type="text" id="gender" value={gender} onChange={e => setGender(e.target.value)} required />
        </Form.Item>

        <Button htmlType='submit' type='primary'>Register</Button>
      </form>
    </div>
  );
}

export default RegistrationForm;