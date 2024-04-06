import { Router } from "express";
import { loginAuth } from '../controllers/login.controllers.js';

const router = Router()

router.post('/login', loginAuth)

export default router