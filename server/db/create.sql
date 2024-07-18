/** CREATE database script **/

drop database if exists reactdb;
create database reactdb;
use reactdb;

CREATE TABLE startup (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL
);

CREATE TABLE utilizador (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    role VARCHAR(50)
);

CREATE TABLE favoritos (
    id_utilizador INT,
    id_startup INT,
    FOREIGN KEY (id_utilizador) REFERENCES Utilizador(id),
    FOREIGN KEY (id_startup) REFERENCES Startup(id)
);