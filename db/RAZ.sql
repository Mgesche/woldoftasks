/* F_Demande */
drop table f_demande;

CREATE TABLE IF NOT EXISTS F_demande (
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, 
	title VARCHAR(100) NOT NULL,
	description VARCHAR(500) NULL,
	dt_meta_cre integer,
	dt_meta_maj integer,
	dt_meta_del integer
);

/* D_Phase_Projet */
drop table d_phase_projet;

CREATE TABLE IF NOT EXISTS D_Phase_Projet (
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, 
	title VARCHAR(100) NOT NULL,
	description VARCHAR(500) NULL,
	dt_meta_cre integer,
	dt_meta_maj integer,
	dt_meta_del integer
);

INSERT INTO D_Phase_Projet (title, dt_meta_cre) VALUES ('Avant Vente', DATETIME('now'));
INSERT INTO D_Phase_Projet (title, dt_meta_cre) VALUES ('Analyse Fonctionelle', DATETIME('now'));
INSERT INTO D_Phase_Projet (title, dt_meta_cre) VALUES ('Analyse Technique', DATETIME('now'));
INSERT INTO D_Phase_Projet (title, dt_meta_cre) VALUES ('Réalisation', DATETIME('now'));
INSERT INTO D_Phase_Projet (title, dt_meta_cre) VALUES ('Recette', DATETIME('now'));
INSERT INTO D_Phase_Projet (title, dt_meta_cre) VALUES ('Livraison', DATETIME('now'));

/* D_Techno */
drop table d_techno;

CREATE TABLE IF NOT EXISTS D_Techno (
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, 
	title VARCHAR(100) NOT NULL,
	description VARCHAR(500) NULL,
	dt_meta_cre integer,
	dt_meta_maj integer,
	dt_meta_del integer
);

INSERT INTO D_Techno (title, dt_meta_cre) VALUES ('Sql Server', DATETIME('now'));
INSERT INTO D_Techno (title, dt_meta_cre) VALUES ('SSIS', DATETIME('now'));
INSERT INTO D_Techno (title, dt_meta_cre) VALUES ('SSAS', DATETIME('now'));
INSERT INTO D_Techno (title, dt_meta_cre) VALUES ('SSRS', DATETIME('now'));
INSERT INTO D_Techno (title, dt_meta_cre) VALUES ('Sharepoint', DATETIME('now'));

/* D_Action */
drop table d_action;

CREATE TABLE IF NOT EXISTS D_Action (
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, 
	title VARCHAR(100) NOT NULL,
	description VARCHAR(500) NULL,
	id_Phase_Projet INTEGER NULL,
	id_Techno INTEGER NULL,
	dt_meta_cre integer,
	dt_meta_maj integer,
	dt_meta_del integer
);

INSERT INTO D_Action (id_Phase_Projet, id_Techno, title, dt_meta_cre) VALUES ('1', '1', 'Voir les nouveautés SQL Server', DATETIME('now'));
INSERT INTO D_Action (id_Phase_Projet, id_Techno, title, dt_meta_cre) VALUES ('1', '2', 'Voir les nouveautés SSIS', DATETIME('now'));
INSERT INTO D_Action (id_Phase_Projet, id_Techno, title, dt_meta_cre) VALUES ('1', '3', 'Voir les nouveautés SSAS', DATETIME('now'));
INSERT INTO D_Action (id_Phase_Projet, id_Techno, title, dt_meta_cre) VALUES ('1', '4', 'Voir les nouveautés SSRS', DATETIME('now'));
INSERT INTO D_Action (id_Phase_Projet, id_Techno, title, dt_meta_cre) VALUES ('1', '5', 'Voir les nouveautés Sharepoint', DATETIME('now'));

/* R_Demande_Phase_Projet */
drop table r_demande_phase_projet;

CREATE TABLE IF NOT EXISTS R_Demande_Phase_Projet (
	id_Demande INTEGER,
	id_Phase_Projet INTEGER,
	dt_meta_cre integer,
	dt_meta_maj integer,
	dt_meta_del integer
);

/* R_Demande_Techno */
drop table r_demande_techno;

CREATE TABLE IF NOT EXISTS R_Demande_Techno (
	id_Demande INTEGER,
	id_Techno INTEGER,
	dt_meta_cre integer,
	dt_meta_maj integer,
	dt_meta_del integer
);

/* R_Demande_Action */
drop table r_demande_action;

CREATE TABLE IF NOT EXISTS R_Demande_Action (
	id_Demande INTEGER,
	id_Action INTEGER,
	dt_meta_cre integer,
	dt_meta_maj integer,
	dt_meta_del integer
);