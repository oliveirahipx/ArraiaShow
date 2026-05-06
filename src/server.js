import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';
import dotenv from 'dotenv';

// Inicializa as variáveis de ambiente
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Configuração da conexão com o banco de dados
// Usando pool para melhor performance e gestão de conexões
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Mig202418',
    database: 'arraia_show',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// --- ROTAS DO ARRAIÁ SHOW ---

// Rota de teste para verificar se a API está online
app.get('/', (req, res) => {
    res.send('🚀 API Arraiá Show online e operando com ES Modules!');
});

// Rota para o Barraqueiro ver seus produtos
app.get('/barraca/:id/produtos', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM produtos WHERE barraca_id = ?';
    
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Erro ao buscar produtos:', err);
            return res.status(500).json({ error: 'Erro interno no servidor' });
        }
        res.json(results); 
    });
});

// Rota para Painel Geral de Arrecadação (Dashboard do Barraqueiro)
app.get('/barraca/:id/arrecadacao', (req, res) => {
    const { id } = req.params;
    const query = `
        SELECT 
            SUM(ip.subtotal) as total_arrecadado,
            SUM(ip.quantidade) as total_itens_vendidos
        FROM itens_pedido ip
        JOIN produtos p ON ip.produto_id = p.id
        WHERE p.barraca_id = ?`;

    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Erro ao calcular arrecadação:', err);
            return res.status(500).json({ error: 'Erro ao processar dados financeiro' });
        }
        // Retorna 0 se não houver vendas ainda
        const data = results[0];
        res.json({
            total_arrecadado: data.total_arrecadado || 0,
            total_itens_vendidos: data.total_itens_vendidos || 0
        });
    });
});

// Inicialização do servidor
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`\n✅ Servidor rodando com sucesso!`);
    console.log(`🔗 Endpoint: http://localhost:${PORT}`);
});