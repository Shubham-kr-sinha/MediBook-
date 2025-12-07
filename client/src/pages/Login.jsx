import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../api';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [userType, setUserType] = useState('patient');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/login', formData);
            login(res.data.token, res.data.role, res.data.userId);

            if (res.data.role === 'admin') navigate('/admin');
            else if (res.data.role === 'doctor') navigate('/doctor');
            else navigate('/patient');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="bg-white p-10 rounded-2xl shadow-2xl w-96 transform transition-all duration-300 hover:shadow-3xl">

                {/* Tabs */}
                <div className="flex mb-8 border-b border-gray-200">
                    <button
                        className={`flex-1 py-3 text-center transition-all duration-200 font-medium text-sm tracking-wide ${userType === 'patient' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                        onClick={() => setUserType('patient')}
                    >
                        PATIENT
                    </button>
                    <button
                        className={`flex-1 py-3 text-center transition-all duration-200 font-medium text-sm tracking-wide ${userType === 'admin' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                        onClick={() => setUserType('admin')}
                    >
                        DOCTOR / ADMIN
                    </button>
                </div>

                <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800">
                    {userType === 'patient' ? 'Welcome Back' : 'Staff Portal'}
                </h2>

                {error && <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-6 text-center text-sm border border-red-100 animate-pulse">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 text-xs font-bold uppercase tracking-wider mb-2 ml-1">Email Address</label>
                        <input
                            type="email"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 focus:bg-white"
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
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 focus:bg-white"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white py-3.5 rounded-lg font-bold shadow-lg hover:bg-blue-700 transform transition-transform duration-100 active:scale-95">
                        Log In
                    </button>
                </form>

                {userType === 'patient' && (
                    <p className="mt-8 text-center text-sm text-gray-600">
                        New here? <Link to="/signup" className="text-blue-600 font-bold hover:underline">Create an account</Link>
                    </p>
                )}
            </div>
        </div>
    );
};

export default Login;
