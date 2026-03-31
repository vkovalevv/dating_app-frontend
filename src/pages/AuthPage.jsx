import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegistrationForm from '../components/RegistrationForm';

function AuthPage({onLogin}) {
  // status choose which form we will be showing  
  const [isLogin, setIsLogin] = useState(true);

  const handleLoginSuccess = () => {
    // After success login
    console.log('Sussesfull login!');
  };

  return (
    <div className="flex flex-col w-screen h-screen items-center justify-center gap-4">

      {isLogin
        ? <LoginForm onSuccess={onLogin} />
        : <RegistrationForm />
      }

      {/* Переключатель */}
      <p className="text-sm text-gray-600">
        {isLogin ? 'Don`t have an account?' : 'Already have an account?'}
        {' '}
        <button
          className="text-blue-500 underline"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? 'Sign up' : 'Sing in'}
        </button>
      </p>

    </div>
  );
}

export default AuthPage;