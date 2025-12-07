import express from 'express';
import { bookAppointment, getPatientAppointments, getDoctorAppointments, updateStatus } from '../controllers/appointmentController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/book', authMiddleware, bookAppointment);
router.get('/my-appointments', authMiddleware, getPatientAppointments);
router.get('/doctor-appointments', authMiddleware, getDoctorAppointments);
router.put('/status/:id', authMiddleware, updateStatus);

export default router;
