import { db } from "../config/db";

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