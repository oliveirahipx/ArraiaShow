import { db } from '../config/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'batata';

//Rota para Registrar Usuário (Participante, Barraqueiro, etc)
export const registrar = async (req, res) => {
    const { nome, email, senha, tipo } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const senha_hash = await bcrypt.hash(senha, salt);
        const query = 'INSERT INTO usuarios (nome, email, senha_hash, tipo) VALUES (?, ?, ?, ?)';
        
        db.query(query, [nome, email, senha_hash, tipo || 'participante'], (err) => {
            if (err) return res.status(500).json({ error: "Erro ao cadastrar" });
            res.status(201).json({ message: "Usuário criado!" });
        });
    } catch (err) {
        res.status(500).json({ error: "Erro interno" });
    }
};


//Rota para logar o usuário e gerar o token JWT
export const login = (req, res) => {
    const { email, senha } = req.body;
    const query = 'SELECT * FROM usuarios WHERE email = ?';

    db.query(query, [email], async (err, results) => {
        if (err || results.length === 0) return res.status(401).json({ message: "Credenciais inválidas" });

        const usuario = results[0];
        const senhaValida = await bcrypt.compare(senha, usuario.senha_hash);

        if (!senhaValida) return res.status(401).json({ message: "Senha incorreta" });

        const token = jwt.sign({ id: usuario.id, tipo: usuario.tipo }, SECRET_KEY, { expiresIn: '2h' });
        res.json({ token, user: { nome: usuario.nome, tipo: usuario.tipo } });
    });
};

// Função para verificar o token JWT (middleware)
export const verificarToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: "Token não fornecido" });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: "Token inválido" });
        req.user = user;
        next();
    });
};

// Middleware para verificar se o usuário é barraqueiro
export const verificarBarraca = (req, res, next) => {
    if (req.user.tipo !== 'barraqueiro') {
        return res.status(403).json({ message: "Acesso negado: apenas barraqueiros" });
    }
    next();
};


// Middleware para verificar se o usuário é organizador
export const verificarOrganizador = (req, res, next) => {
    if (req.user.tipo !== 'organizador') {
        return res.status(403).json({ message: "Acesso negado: apenas organizadores" });
    }
    next();
};

// Middleware para verificar se o usuário é participante
export const verificarParticipante = (req, res, next) => {
    if (req.user.tipo !== 'participante') {
        return res.status(403).json({ message: "Acesso negado: apenas participantes" });
    }
    next();
};
