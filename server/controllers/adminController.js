import User from '../models/User.js';
import Doctor from '../models/Doctor.js';
import Appointment from '../models/Appointment.js';

export const getStats = async (req, res) => {
    try {
        const totalDoctors = await Doctor.countDocuments();
        const totalPatients = await User.countDocuments({ role: 'patient' });
        const totalAppointments = await Appointment.countDocuments();

        res.json({
            totalDoctors,
            totalPatients,
            totalAppointments
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching stats' });
    }
};
