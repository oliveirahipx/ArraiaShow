const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Conexão com o Banco que você criou
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Mig202418',
    database: 'arraia_show'
});

// Rota para o Barraqueiro ver seus produtos
app.get('/barraca/:id/produtos', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM produtos WHERE barraca_id = ?';
    
    db.query(query, [id], (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results); 
    });
});

// Rota para Painel Geral de Arrecadação (Dashboard)
app.get('/barraca/:id/arrecadacao', (req, res) => {
    const { id } = req.params;
    const query = `
        SELECT SUM(subtotal) as total_arrecadado 
        FROM itens_pedido ip
        JOIN produtos p ON ip.produto_id = p.id
        WHERE p.barraca_id = ?`;

    db.query(query, [id], (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results[0]);
    });
});


app.listen(3001, () => console.log("Servidor rodando na porta 3001"));