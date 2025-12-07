import Appointment from '../models/Appointment.js';
import Doctor from '../models/Doctor.js';

// Book Appointment (Patient)
export const bookAppointment = async (req, res) => {
    try {
        const { doctorId, date, time } = req.body;

        const appointment = new Appointment({
            userId: req.user.userId,
            doctorId,
            date,
            time,
            status: 'pending'
        });

        await appointment.save();
        res.status(201).json({ message: 'Appointment booked successfully', appointment });
    } catch (error) {
        res.status(500).json({ message: 'Error booking appointment' });
    }
};

// Get Patient Appointments
export const getPatientAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({ userId: req.user.userId })
            .populate({
                path: 'doctorId',
                populate: { path: 'userId', select: 'name' }
            });
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching appointments' });
    }
};

// Get Doctor Appointments
export const getDoctorAppointments = async (req, res) => {
    try {
        const doctor = await Doctor.findOne({ userId: req.user.userId });
        if (!doctor) return res.status(404).json({ message: 'Doctor profile not found' });

        const appointments = await Appointment.find({ doctorId: doctor._id })
            .populate('userId', 'name email');
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: 'Error' });
    }
};

export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const appointment = await Appointment.findById(req.params.id);

        if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

        // Verify ownership
        const doctor = await Doctor.findOne({ userId: req.user.userId });
        if (appointment.doctorId.toString() !== doctor._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        appointment.status = status;
        await appointment.save();
        res.json(appointment);
    } catch (error) {
        res.status(500).json({ message: 'Error updating status' });
    }
}
