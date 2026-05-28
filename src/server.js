import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import barracasRoutes from './routes/barracasRoutes.js';
import eventosRoutes from './routes/eventosRoutes.js';
import produtosRoutes from './routes/produtosRoutes.js';
import { verificarToken } from './controllers/authController.js';


const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);

app.use(verificarToken); // Aplica o middleware de verificação de token a todas as rotas abaixo

// Monta as rotas.
app.use('/barracas', barracasRoutes);
app.use('/eventos', eventosRoutes);
app.use('/produtos', produtosRoutes);

app.listen(3001, () => {
    console.log("Servidor do Arraiá rodando");
});