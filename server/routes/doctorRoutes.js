import express from 'express';
import { addDoctor, getAllDoctors, updateProfile } from '../controllers/doctorController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Get all doctors (Public)
router.get('/', getAllDoctors);

// Add doctor (Admin only)
// TODO: Add admin check middleware. For MVP, assuming Admin has role 'admin' in authMiddleware
// but authMiddleware only checks token. We need to check role manually or in middleware.
router.post('/', authMiddleware, async (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied' });
    }
    next();
}, addDoctor);

// Update profile (Doctor only)
router.put('/profile', authMiddleware, async (req, res, next) => {
    if (req.user.role !== 'doctor') {
        return res.status(403).json({ message: 'Access denied' });
    }
    next();
}, updateProfile);

export default router;
