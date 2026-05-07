import express from 'express';
import { criarBarraca, listarBarracasPorEvento } from '../controllers/barracasController.js';

const router = express.Router();

// Rota para cadastrar (POST)
router.post('/', criarBarraca);

// Rota para buscar barracas de um evento (GET)
router.get('/evento/:eventoId', listarBarracasPorEvento);

export default router;