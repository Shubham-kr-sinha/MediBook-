import Doctor from '../models/Doctor.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

// Add Doctor (Admin only)
export const addDoctor = async (req, res) => {
    try {
        const { name, email, password, specialization, experience, feesPerConsultation, timings, website } = req.body;

        // Check if user exists
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword,
            role: 'doctor'
        });

        const savedUser = await user.save();

        const doctor = new Doctor({
            userId: savedUser._id,
            specialization,
            experience,
            feesPerConsultation,
            timings,
            website
        });

        await doctor.save();

        res.status(201).json({ message: 'Doctor added successfully', doctor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error adding doctor' });
    }
};

// Get all doctors
export const getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find().populate('userId', 'name email');
        res.json(doctors);
    } catch (error) {
        res.status(500).json({ message: 'Server error fetching doctors' });
    }
};

// Update Availability (Doctor only)
export const updateProfile = async (req, res) => {
    try {
        const { feesPerConsultation, timings, website } = req.body;
        const doctor = await Doctor.findOne({ userId: req.user.userId });

        if (!doctor) {
            return res.status(404).json({ message: 'Doctor profile not found' });
        }

        if (feesPerConsultation) doctor.feesPerConsultation = feesPerConsultation;
        if (timings) doctor.timings = timings;
        if (website) doctor.website = website;

        await doctor.save();
        res.json(doctor);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}
