import express from 'express';
import { getAdminAlerts } from '../controllers/alert.controller.js';
import { protect, admin } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', protect, admin, getAdminAlerts);

export default router;
