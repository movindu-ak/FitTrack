import express from 'express';
import { getCurrentCrowd, getCrowdForecast } from '../controllers/crowd.controller.js';

const router = express.Router();

router.get('/current', getCurrentCrowd);
router.get('/forecast', getCrowdForecast);

export default router;
