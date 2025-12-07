import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    specialization: {
        type: String,
        required: true,
    },
    experience: {
        type: Number,
        required: true,
    },
    feesPerConsultation: {
        type: Number,
        required: true
    },
    timings: {
        type: Object,
        required: true // e.g., { "Monday": "10:00-12:00" }
    },
    website: {
        type: String
    }
});

const Doctor = mongoose.model('Doctor', doctorSchema);
export default Doctor;
