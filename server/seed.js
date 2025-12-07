import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import Doctor from './models/Doctor.js';
import Appointment from './models/Appointment.js';

dotenv.config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        // Clear existing data
        await User.deleteMany({});
        await Doctor.deleteMany({});
        await Appointment.deleteMany({});

        console.log('Data Cleared');

        // Create Admin
        const adminHash = await bcrypt.hash('admin123', 10);
        const admin = await User.create({
            name: 'Super Admin',
            email: 'admin@example.com',
            password: adminHash,
            role: 'admin'
        });

        // Create Patient
        const patientHash = await bcrypt.hash('patient123', 10);
        const patient = await User.create({
            name: 'John Patient',
            email: 'patient@example.com',
            password: patientHash,
            role: 'patient'
        });

        // Create Doctor User
        const doctorHash = await bcrypt.hash('doctor123', 10);
        const doctorUser = await User.create({
            name: 'Dr. Smith',
            email: 'doctor@example.com',
            password: doctorHash,
            role: 'doctor'
        });

        // Create Doctor Profile
        const doctorProfile = await Doctor.create({
            userId: doctorUser._id,
            specialization: 'Cardiology',
            experience: 15,
            feesPerConsultation: 100,
            timings: { "Monday": "09:00 - 17:00", "Wednesday": "09:00 - 17:00" },
            website: 'https://drsmith.com'
        });

        // Create Another Doctor
        const doctorHash2 = await bcrypt.hash('doctor123', 10);
        const doctorUser2 = await User.create({
            name: 'Dr. Emily',
            email: 'emily@example.com',
            password: doctorHash2,
            role: 'doctor'
        });

        await Doctor.create({
            userId: doctorUser2._id,
            specialization: 'Dermatology',
            experience: 8,
            feesPerConsultation: 80,
            timings: { "Tuesday": "10:00 - 14:00" },
            website: 'https://dremily.com'
        });

        console.log('Data Seeded Successfully');
        console.log('Admin: admin@example.com / admin123');
        console.log('Doctor: doctor@example.com / doctor123');
        console.log('Patient: patient@example.com / patient123');

        process.exit();
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();
