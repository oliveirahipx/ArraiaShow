import express from 'express';
import { criarBarraca, listarBarracasPorEvento, listartodasBarracas } from '../controllers/barracasController.js';

const router = express.Router();

// Rota para cadastrar (POST)
router.post('/', criarBarraca);

// Rota para buscar barracas de um evento (GET)
router.get('/evento/:eventoId', listarBarracasPorEvento);

// Rota para buscar todas as barracas (GET)
router.get('/', listartodasBarracas);

export default router;

