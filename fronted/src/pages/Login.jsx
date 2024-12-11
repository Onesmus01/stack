import React, { useState, useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [currentState, setCurrentState] = useState('login');
  const { setToken, navigate, backendUrl } = useContext(ShopContext);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Added loading state

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true); // Start loading

    try {
      let response;
      if (currentState === 'signup') {
        response = await axios.post(`${backendUrl}/api/user/register`, { name, email, password });
      } else {
        response = await axios.post(`${backendUrl}/api/user/login`, { email, password });
      }

      // Check if response indicates success
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        toast.success(`${currentState === 'signup' ? 'Registration' : 'Login'} successful!`);
        
        // Clear input fields after successful submission
        if (currentState === 'signup') {
          setName('');
        }
        setEmail('');
        setPassword('');
        
        navigate('/'); // Redirect to the home page
      } else {
        toast.error(response.data.message || 'Unknown error occurred');
      }
    } catch (error) {
      console.error(error);
      // Check if error.response exists before accessing its properties
      toast.error(error.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false); // End loading
    }
  };

  useEffect(() => {
    // Optionally check if the user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
      setToken(token);
      navigate('/'); // Navigate to the homepage if logged in
    }
  }, [navigate, setToken]);

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className='prata-regular text-brandBlue-500 text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>
      {currentState === 'signup' && (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className='w-full px-3 py-2 border border-gray-800'
          placeholder='Name'
          required
        />
      )}
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        className='w-full px-3 py-2 border border-gray-800'
        placeholder='Email'
        required
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        className='w-full px-3 py-2 border border-gray-800'
        placeholder='Password'
        required
      />
      <div className='w-full flex justify-between text-sm mt-[8px]'>
        <p className='cursor-pointer'>Forgot your password?</p>
        {currentState === 'login' ? (
          <p onClick={() => setCurrentState('signup')} className='cursor-pointer'>Create account</p>
        ) : (
          <p onClick={() => setCurrentState('login')} className='cursor-pointer'>Login Here</p>
        )}
      </div>
      <button className='bg-black text-white font-light px-8 py-2 mt-4' disabled={loading}>
        {loading ? 'Loading...' : (currentState === 'login' ? 'Sign In' : 'Sign Up')}
      </button>
    </form>
  );
};

export default Login;
