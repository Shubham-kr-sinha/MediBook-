import { useState, useEffect, useContext } from 'react';
import api from '../api';
import { AuthContext } from '../context/AuthContext';

const PatientDashboard = () => {
    const [doctors, setDoctors] = useState([]);
    const [myAppointments, setMyAppointments] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [booking, setBooking] = useState({ date: '', time: '' });
    const [showModal, setShowModal] = useState(false);
    const { logout } = useContext(AuthContext);

    useEffect(() => {
        fetchDoctors();
        fetchMyAppointments();
    }, []);

    const fetchDoctors = async () => {
        const res = await api.get('/doctors');
        setDoctors(res.data);
    };

    const fetchMyAppointments = async () => {
        const res = await api.get('/appointments/my-appointments');
        setMyAppointments(res.data);
    };

    const handleBook = async (e) => {
        e.preventDefault();
        try {
            await api.post('/appointments/book', {
                doctorId: selectedDoctor._id,
                date: booking.date,
                time: booking.time
            });
            setShowModal(false);
            setBooking({ date: '', time: '' });
            fetchMyAppointments();
            alert('Appointment booked successfully!');
        } catch (error) {
            alert('Error booking appointment');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-10 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-800">Patient Dashboard</h1>
                        <p className="text-gray-500 mt-1">Welcome back, find the best care for you.</p>
                    </div>
                    <button onClick={logout} className="bg-red-50 text-red-500 hover:bg-red-500 hover:text-white px-6 py-2.5 rounded-xl font-bold transition-all duration-300 border border-red-100">
                        Logout
                    </button>
                </div>

                {/* Doctors List */}
                <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
                    <span className="bg-blue-100 text-blue-600 p-2 rounded-lg mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    </span>
                    Available Doctors
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {doctors.map(doc => (
                        <div key={doc._id} className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col group cursor-default relative overflow-hidden">
                            <div className="absolute top-0 right-0 bg-blue-500 w-24 h-24 rounded-full -mr-12 -mt-12 opacity-10 group-hover:scale-150 transition-transform duration-500"></div>

                            <div className="flex items-center space-x-4 mb-6 relative z-10">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center text-blue-600 font-bold text-2xl shadow-inner">
                                    {doc.userId?.name?.[0] || 'D'}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">{doc.userId?.name}</h3>
                                    <p className="text-blue-500 text-sm font-semibold uppercase tracking-wide">{doc.specialization}</p>
                                </div>
                            </div>

                            <div className="space-y-3 text-gray-600 mb-8 flex-grow">
                                <p className="flex justify-between items-center text-sm border-b border-gray-50 pb-2">
                                    <span className="text-gray-400">Experience</span>
                                    <span className="font-semibold text-gray-800">{doc.experience} years</span>
                                </p>
                                <p className="flex justify-between items-center text-sm border-b border-gray-50 pb-2">
                                    <span className="text-gray-400">Consultation Fee</span>
                                    <span className="font-bold text-green-600 text-lg">${doc.feesPerConsultation}</span>
                                </p>
                            </div>

                            <button
                                onClick={() => { setSelectedDoctor(doc); setShowModal(true); }}
                                className="w-full bg-gray-900 text-white py-3.5 rounded-xl font-bold hover:bg-blue-600 transition-all duration-300 transform active:scale-95 shadow-md flex items-center justify-center space-x-2 group-hover:shadow-blue-200"
                            >
                                <span>Book Appointment</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                            </button>
                        </div>
                    ))}
                </div>

                {/* My Appointments */}
                <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
                    <span className="bg-purple-100 text-purple-600 p-2 rounded-lg mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </span>
                    My Appointments
                </h2>
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                    <table className="min-w-full">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="p-6 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Doctor</th>
                                <th className="p-6 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="p-6 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Time</th>
                                <th className="p-6 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {myAppointments.map(app => (
                                <tr key={app._id} className="hover:bg-gray-50 transition-colors duration-150">
                                    <td className="p-6 font-medium text-gray-800">{app.doctorId?.userId?.name || 'Unknown'}</td>
                                    <td className="p-6 text-gray-600">{app.date}</td>
                                    <td className="p-6 text-gray-600">{app.time}</td>
                                    <td className="p-6">
                                        <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide border ${app.status === 'approved' ? 'bg-green-100 text-green-700 border-green-200' : app.status === 'cancelled' ? 'bg-red-100 text-red-700 border-red-200' : 'bg-yellow-100 text-yellow-700 border-yellow-200'}`}>
                                            {app.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {myAppointments.length === 0 && <div className="p-12 text-center text-gray-400">No appointments scheduled yet.</div>}
                </div>

                {/* Booking Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
                        <div className="bg-white p-8 rounded-3xl shadow-2xl w-96 transform transition-all scale-100">
                            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4">Book Appointment</h2>
                            <p className="mb-6 text-gray-600">With <span className="font-bold text-blue-600">{selectedDoctor?.userId?.name}</span></p>

                            <form onSubmit={handleBook} className="space-y-5">
                                <div>
                                    <label className="block text-gray-700 text-xs font-bold uppercase tracking-wider mb-2">Date</label>
                                    <input type="date" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" value={booking.date} onChange={e => setBooking({ ...booking, date: e.target.value })} required />
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-xs font-bold uppercase tracking-wider mb-2">Time</label>
                                    <input type="time" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" value={booking.time} onChange={e => setBooking({ ...booking, time: e.target.value })} required />
                                </div>
                                <div className="flex justify-end gap-3 pt-4">
                                    <button type="button" onClick={() => setShowModal(false)} className="px-6 py-2.5 text-gray-500 hover:text-gray-800 font-semibold transition-colors">Cancel</button>
                                    <button type="submit" className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold shadow-lg hover:bg-blue-700 transition-all transform active:scale-95">Confirm</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PatientDashboard;
