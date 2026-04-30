-- 1. Criação dos tipos ENUM (necessário antes de usar nas tabelas)
CREATE TYPE tipo_usuario AS ENUM ('admin', 'organizador', 'barraqueiro', 'participante');
CREATE TYPE status_pedido AS ENUM ('pendente', 'pago', 'cancelado', 'entregue');

-- 2. Criação das tabelas
CREATE TABLE usuarios ( 
   id SERIAL PRIMARY KEY, 
   nome VARCHAR(100) NOT NULL, 
   email VARCHAR(100) UNIQUE NOT NULL, 
   senha_hash VARCHAR(255) NOT NULL, 
   tipo tipo_usuario DEFAULT 'participante', 
   criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
); 
 
CREATE TABLE eventos ( 
   id SERIAL PRIMARY KEY, 
   nome VARCHAR(100) NOT NULL, 
   data_evento DATE NOT NULL, 
   ativo BOOLEAN DEFAULT TRUE 
); 
 
CREATE TABLE barracas ( 
   id SERIAL PRIMARY KEY, 
   evento_id INT NOT NULL, 
   nome VARCHAR(100) NOT NULL, 
   responsavel_id INT, 
   FOREIGN KEY (evento_id) REFERENCES eventos(id), 
   FOREIGN KEY (responsavel_id) REFERENCES usuarios(id) 
); 
 
CREATE TABLE produtos ( 
   id SERIAL PRIMARY KEY, 
   barraca_id INT NOT NULL, 
   nome VARCHAR(100) NOT NULL, 
   preco DECIMAL(10, 2) NOT NULL, 
   estoque INT NOT NULL DEFAULT 0, 
   FOREIGN KEY (barraca_id) REFERENCES barracas(id) 
); 
 
CREATE TABLE pedidos ( 
   id SERIAL PRIMARY KEY, 
   usuario_id INT NOT NULL, 
   total DECIMAL(10, 2) NOT NULL, 
   status status_pedido DEFAULT 'pendente', 
   pix_copia_cola TEXT, 
   criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
   FOREIGN KEY (usuario_id) REFERENCES usuarios(id) 
); 
 
CREATE TABLE itens_pedido ( 
   id SERIAL PRIMARY KEY, 
   pedido_id INT NOT NULL, 
   produto_id INT NOT NULL, 
   quantidade INT NOT NULL, 
   subtotal DECIMAL(10, 2) NOT NULL, 
   FOREIGN KEY (pedido_id) REFERENCES pedidos(id), 
   FOREIGN KEY (produto_id) REFERENCES produtos(id) 
);



-- 1. Inserir Usuários
INSERT INTO usuarios (nome, email, senha_hash, tipo) VALUES
('Administrador', 'admin@evento.com', 'hash_seguro_1', 'admin'),
('João Barraqueiro', 'joao@barraca.com', 'hash_seguro_2', 'barraqueiro'),
('Maria Participante', 'maria@cliente.com', 'hash_seguro_3', 'participante');

-- 2. Inserir Eventos
INSERT INTO eventos (nome, data_evento, ativo) VALUES
('Festa Junina 2026', '2026-06-24', TRUE);

-- 3. Inserir Barracas (Depende de eventos e usuarios)
INSERT INTO barracas (evento_id, nome, responsavel_id) VALUES
(1, 'Barraca do Milho', 2);

-- 4. Inserir Produtos (Depende de barracas)
INSERT INTO produtos (barraca_id, nome, preco, estoque) VALUES
(1, 'Milho Cozido', 5.00, 100),
(1, 'Pamonha', 8.00, 50);

-- 5. Inserir Pedidos (Depende de usuarios)
INSERT INTO pedidos (usuario_id, total, status, pix_copia_cola) VALUES
(3, 13.00, 'pendente', '0002010102112644...');

-- 6. Inserir Itens do Pedido (Depende de pedidos e produtos)
INSERT INTO itens_pedido (pedido_id, produto_id, quantidade, subtotal) VALUES
(1, 1, 1, 5.00), -- 1 Milho
(1, 2, 1, 8.00); -- 1 Pamonha



SELECT nome, preco, estoque FROM produtos WHERE estoque > 0;

