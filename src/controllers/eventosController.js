import { db } from "../config/db.js";

// Criar um novo evento
export const criarEvento = (req, res) => {
    const { nome, data, ativo } = req.body;
    const query = 'INSERT INTO eventos (nome, data, ativo) VALUES (?, ?, ?)';

    db.query(query, [nome, data, ativo], (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ message: "Evento criado com sucesso!", id: result.insertId });
    });
};

// Listar todos os eventos
export const listarEventos = (req, res) => {
    const query = 'SELECT * FROM eventos';

    db.query(query, (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
};

// Buscar um evento por ID
export const listarEventoPorId = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM eventos WHERE id = ?';

    db.query(query, [id], (err, results) => {
        if (err) return res.status(500).json(err);
        if (results.length === 0) return res.status(404).json({ message: "Evento não encontrado" });
        res.json(results[0]);
    });
};
