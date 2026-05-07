import express from "express";
import { criarEvento, listarEventos, listarEventoPorId } from '../controllers/eventosController.js';


const router = express.Router();

// Rota para criar um evento (POST)
router.post('/', criarEvento);

// Rota para listar todos os eventos (GET)
router.get('/', listarEventos);

// Rota para buscar um evento por ID (GET)
router.get('/:id', listarEventoPorId);
