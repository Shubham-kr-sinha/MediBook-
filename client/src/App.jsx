
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { useContext } from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import PatientDashboard from './pages/PatientDashboard';

const Home = () => (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white animate-fade-in">
        <div className="text-center space-y-6 max-w-2xl px-4">
            <h1 className="text-6xl font-extrabold mb-4 drop-shadow-lg tracking-tight">Smart Medical System</h1>
            <p className="text-xl opacity-90 mb-8 font-light leading-relaxed">
                Seamless appointments, simplified management, and better healthcare experiences for everyone.
            </p>
            <div className="flex justify-center space-x-6">
                <a href="/login" className="bg-white text-indigo-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition transform hover:scale-105 shadow-xl">
                    Get Started
                </a>
                <a href="/signup" className="border-2 border-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-indigo-600 transition transform hover:scale-105 shadow-xl">
                    Sign Up
                </a>
            </div>
        </div>
    </div>
);

const ProtectedRoute = ({ children, role }) => {
    const { user, loading } = useContext(AuthContext);
    if (loading) return <div className="min-h-screen flex items-center justify-center text-xl">Loading...</div>;
    if (!user) return <Navigate to="/login" />;
    if (role && user.role !== role) return <Navigate to="/" />;
    return children;
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="min-h-screen bg-gray-50 font-sans">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />

                        <Route
                            path="/admin"
                            element={
                                <ProtectedRoute role="admin">
                                    <AdminDashboard />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/doctor"
                            element={
                                <ProtectedRoute role="doctor">
                                    <DoctorDashboard />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/patient"
                            element={
                                <ProtectedRoute role="patient">
                                    <PatientDashboard />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
