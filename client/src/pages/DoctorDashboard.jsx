import { useState, useEffect, useContext } from 'react';
import api from '../api';
import { AuthContext } from '../context/AuthContext';

const DoctorDashboard = () => {
    const [appointments, setAppointments] = useState([]);
    const { logout } = useContext(AuthContext);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const res = await api.get('/appointments/doctor-appointments');
                setAppointments(res.data);
            } catch (error) {
                console.error("Error fetching appointments");
            }
        };
        fetchAppointments();
    }, []);

    const handleStatus = async (id, status) => {
        try {
            await api.put(`/appointments/status/${id}`, { status });
            setAppointments(appointments.map(app => app._id === id ? { ...app, status } : app));
        } catch (error) {
            console.error("Error updating status");
        }
    };

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Doctor Dashboard</h1>
                <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Logout</button>
            </div>
            <div className="bg-white rounded shadow overflow-hidden">
                <table className="min-w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-4 text-left">Patient</th>
                            <th className="p-4 text-left">Date</th>
                            <th className="p-4 text-left">Time</th>
                            <th className="p-4 text-left">Status</th>
                            <th className="p-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map(app => (
                            <tr key={app._id} className="border-t">
                                <td className="p-4">{app.userId?.name || 'Unknown'}</td>
                                <td className="p-4">{app.date}</td>
                                <td className="p-4">{app.time}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-sm ${app.status === 'approved' ? 'bg-green-100 text-green-800' : app.status === 'cancelled' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                        {app.status}
                                    </span>
                                </td>
                                <td className="p-4">
                                    {app.status === 'pending' && (
                                        <>
                                            <button onClick={() => handleStatus(app._id, 'approved')} className="bg-green-500 text-white px-3 py-1 rounded mr-2 hover:bg-green-600">Accept</button>
                                            <button onClick={() => handleStatus(app._id, 'cancelled')} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Reject</button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {appointments.length === 0 && <p className="p-4 text-center text-gray-500">No appointments found.</p>}
            </div>
        </div>
    );
};

export default DoctorDashboard;
