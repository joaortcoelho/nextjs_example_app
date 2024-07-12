create database if not exists reactdb;
use reactdb;

CREATE TABLE Startup (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL
);

CREATE TABLE Utilizador (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL
);

CREATE TABLE Favoritos (
    id_utilizador INT,
    id_startup INT,
    FOREIGN KEY (id_utilizador) REFERENCES Utilizador(id),
    FOREIGN KEY (id_startup) REFERENCES Startup(id)
);