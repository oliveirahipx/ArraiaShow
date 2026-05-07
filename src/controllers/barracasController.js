import { db } from '../config/db.js';

// Criar uma nova barraca
export const criarBarraca = (req, res) => {
    const { evento_id, nome, responsavel_id } = req.body;

    const query = 'INSERT INTO barracas (evento_id, nome, responsavel_id) VALUES (?, ?, ?)';

    db.query(query, [evento_id, nome, responsavel_id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Erro ao criar barraca. Verifique se o Evento e o Responsável existem." });
        }
        res.status(201).json({ message: "Barraca cadastrada com sucesso!", id: result.insertId });
    });
};

// Listar todas as barracas de um evento específico
export const listarBarracasPorEvento = (req, res) => {
    const { eventoId } = req.params;
    const query = 'SELECT * FROM barracas WHERE evento_id = ?';

    db.query(query, [eventoId], (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
};