import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

const Signup = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/auth/register', { ...formData, role: 'patient' });
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Signup failed');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-br from-green-50 to-teal-100">
            <div className="bg-white p-10 rounded-2xl shadow-2xl w-96 transform transition-all duration-300 hover:shadow-3xl">
                <h2 className="text-3xl font-extrabold mb-2 text-center text-gray-800">Create Account</h2>
                <p className="text-center text-gray-500 mb-8 text-sm font-medium">Join us as a Patient</p>

                {error && <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-6 text-center text-sm border border-red-100 animate-pulse">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-gray-700 text-xs font-bold uppercase tracking-wider mb-2 ml-1">Full Name</label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 focus:bg-white"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-xs font-bold uppercase tracking-wider mb-2 ml-1">Email Address</label>
                        <input
                            type="email"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 focus:bg-white"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-xs font-bold uppercase tracking-wider mb-2 ml-1">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 focus:bg-white"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-green-600 text-white py-3.5 rounded-lg font-bold shadow-lg hover:bg-green-700 transform transition-transform duration-100 active:scale-95 mt-4">
                        Sign Up
                    </button>
                </form>
                <p className="mt-8 text-center text-sm text-gray-600">
                    Already have an account? <Link to="/login" className="text-green-600 font-bold hover:underline">Log in</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
