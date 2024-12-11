import React, { useState } from 'react';
import { backendUrl } from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = ({ setToken }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${backendUrl}/api/user/admin`, {
                email,
                password,
            });

            if (response.data.success) {
                const token = response.data.token;
                setToken(token); // Set token in the state
                localStorage.setItem('token', token); // Store token in localStorage

                // Optionally set token for future axios requests
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                toast.success('Login successful!');

                // Redirect or navigate to another page if needed
                // e.g., history.push('/dashboard'); or use useNavigate() from react-router
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
            console.log(errorMessage);
            toast.error(errorMessage);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center text-gray-800">Admin Panel</h2>
                <form onSubmit={onSubmitHandler} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block mb-1 text-gray-600 font-medium">Email Address</label>
                        <input
                            id="email"
                            className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                            type="email"
                            placeholder="your@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-1 text-gray-600 font-medium">Password</label>
                        <input
                            id="password"
                            className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                            type="password"
                            placeholder="Enter Your Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 mt-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition duration-300"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
