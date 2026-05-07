import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import barracasRoutes from './routes/barracasRoutes.js';
import eventosRoutes from './routes/eventosRoutes.js';


const app = express();

app.use(cors());
app.use(express.json());

// Monta as rotas.
app.use('/auth', authRoutes);
app.use('/barracas', barracasRoutes);
app.use('/eventos', eventosRoutes);

app.listen(3001, () => {
    console.log("Servidor do Arraiá rodando");
});