import { useState, useEffect, useContext } from 'react';
import api from '../api';
import { AuthContext } from '../context/AuthContext';

const AdminDashboard = () => {
    const [stats, setStats] = useState({ totalDoctors: 0, totalPatients: 0, totalAppointments: 0 });
    const [doctorForm, setDoctorForm] = useState({ name: '', email: '', password: '', specialization: '', experience: 0, feesPerConsultation: 0, timings: {}, website: '' });
    const [message, setMessage] = useState('');
    const { logout } = useContext(AuthContext);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const res = await api.get('/admin/stats');
            setStats(res.data);
        } catch (error) {
            console.error("Error fetching stats", error);
        }
    };

    const handleAddDoctor = async (e) => {
        e.preventDefault();
        try {
            // Simple timing parsing for MVP: assume JSON or string
            const payLoad = { ...doctorForm, timings: { "Default": "9AM-5PM" } }; // Simplified
            await api.post('/doctors', payLoad);
            setMessage('Doctor added successfully');
            setDoctorForm({ name: '', email: '', password: '', specialization: '', experience: 0, feesPerConsultation: 0, timings: {}, website: '' });
            fetchStats();
        } catch (error) {
            setMessage('Error adding doctor');
        }
    };

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Logout</button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-12">
                <div className="bg-blue-100 p-6 rounded shadow">
                    <h3 className="text-xl font-bold">Total Doctors</h3>
                    <p className="text-4xl">{stats.totalDoctors}</p>
                </div>
                <div className="bg-green-100 p-6 rounded shadow">
                    <h3 className="text-xl font-bold">Total Patients</h3>
                    <p className="text-4xl">{stats.totalPatients}</p>
                </div>
                <div className="bg-purple-100 p-6 rounded shadow">
                    <h3 className="text-xl font-bold">Total Appointments</h3>
                    <p className="text-4xl">{stats.totalAppointments}</p>
                </div>
            </div>

            {/* Add Doctor Form */}
            <div className="bg-white p-6 rounded shadow max-w-2xl">
                <h2 className="text-2xl font-bold mb-4">Add New Doctor</h2>
                {message && <p className="mb-4 text-blue-600">{message}</p>}
                <form onSubmit={handleAddDoctor} className="grid grid-cols-2 gap-4">
                    <input placeholder="Name" className="border p-2 rounded" value={doctorForm.name} onChange={e => setDoctorForm({ ...doctorForm, name: e.target.value })} required />
                    <input placeholder="Email" type="email" className="border p-2 rounded" value={doctorForm.email} onChange={e => setDoctorForm({ ...doctorForm, email: e.target.value })} required />
                    <input placeholder="Password" type="password" className="border p-2 rounded" value={doctorForm.password} onChange={e => setDoctorForm({ ...doctorForm, password: e.target.value })} required />
                    <input placeholder="Specialization" className="border p-2 rounded" value={doctorForm.specialization} onChange={e => setDoctorForm({ ...doctorForm, specialization: e.target.value })} required />
                    <input placeholder="Experience (years)" type="number" className="border p-2 rounded" value={doctorForm.experience || ''} onChange={e => setDoctorForm({ ...doctorForm, experience: e.target.value })} required />
                    <input placeholder="Fees" type="number" className="border p-2 rounded" value={doctorForm.feesPerConsultation || ''} onChange={e => setDoctorForm({ ...doctorForm, feesPerConsultation: e.target.value })} required />
                    <button type="submit" className="col-span-2 bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Add Doctor</button>
                </form>
            </div>
        </div>
    );
};

export default AdminDashboard;
