import express from 'express';
import { registrar, login } from '../controllers/authController.js';

const router = express.Router();
// Todas as rotas aqui começam com /auth (definido no server.js)
router.post('/registrar', registrar);
router.post('/login', login);

export default router;