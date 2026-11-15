-- Script do banco da Livraria
-- Rode este arquivo inteiro no MySQL Workbench (raio ⚡).
-- Ele apaga e recria tudo: pode rodar de novo sempre que quiser começar do zero.

DROP DATABASE IF EXISTS livraria;
CREATE DATABASE livraria;
USE livraria;

-- A tabela categorias vem primeiro: a tabela livros aponta para ela.
CREATE TABLE categorias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(50) NOT NULL,
  descricao VARCHAR(200)
);

CREATE TABLE livros (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(150) NOT NULL,
  autor VARCHAR(100) NOT NULL,
  preco DECIMAL(10, 2) NOT NULL,
  estoque INT NOT NULL,
  categoria_id INT,
  FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

INSERT INTO categorias (nome, descricao) VALUES
  ('Ficção', 'Romances, fantasia e ficção científica'),
  ('Tecnologia', 'Programação, engenharia de software e afins');

INSERT INTO livros (titulo, autor, preco, estoque, categoria_id) VALUES
  ('Clean Code', 'Robert C. Martin', 89.90, 12, 2),
  ('Eloquent JavaScript', 'Marijn Haverbeke', 45.00, 20, 2),
  ('O Hobbit', 'J.R.R. Tolkien', 39.90, 8, 1);

SELECT * FROM livros;
