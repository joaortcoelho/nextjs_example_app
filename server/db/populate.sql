/** POPULATE database script **/

INSERT INTO Startup (nome) VALUES ('Startup1'), ('Startup2'), ('Startup3'), ('Startup4'), ('Startup5');

INSERT INTO Utilizador (username, password) VALUES ('user1', 'pass1'), ('user2', 'pass2'), ('user3', 'pass3'), ('user4', 'pass4'), ('user5', 'pass5');

INSERT INTO Favoritos (id_utilizador, id_startup) VALUES (1, 1), (2, 2), (3, 3), (4, 4), (5, 5);