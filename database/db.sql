-- Usuarios

CREATE TABLE user_type(
    Id_usrtype INT(1) NOT NULL,
    Type VARCHAR(30) NOT NULL
);

ALTER TABLE user_type
    ADD PRIMARY KEY (Id_usrtype);

ALTER TABLE user_type
    MODIFY Id_usrtype INT(1) NOT NULL AUTO_INCREMENT;

CREATE TABLE users(
    Id_usr INT(3) NOT NULL,
    Id_usrtype INT(1) NOT NULL,
    Username VARCHAR(16) NOT NULL,
    Password VARCHAR(60) NOT NULL,
    Fullname VARCHAR(100) NOT NULL,
    Mail VARCHAR(50) NOT NULL,
    Phone VARCHAR(15) NOT NULL,
    Description TEXT NOT NULL,
    Photo VARCHAR(30) NOT NULL,
    CONSTRAINT fk_typeusr FOREIGN KEY (Id_usrtype) REFERENCES user_type(Id_usrtype)
);

ALTER TABLE users
    ADD PRIMARY KEY (Id_usr);

ALTER TABLE users
    MODIFY Id_usr INT(3) NOT NULL AUTO_INCREMENT;

-- Categorias

CREATE TABLE categories(
    Id_cat INT(2) NOT NULL,
    category VARCHAR(30) NOT NULL
);

ALTER TABLE categories
    ADD PRIMARY KEY (Id_cat);

ALTER TABLE categories
    MODIFY Id_cat INT(2) NOT NULL AUTO_INCREMENT;

-- Articulos

CREATE TABLE articles(
    Id_art INT(3) NOT NULL,
    Id_cat INT(2) NOT NULL,
    Title VARCHAR(50) NOT NULL,
    Body TEXT NOT NULL,
    Create_at timestamp NOT NULL DEFAULT current_timestamp,
    Public INT(1) NOT NULL,
    CONSTRAINT fk_category FOREIGN KEY (Id_cat) REFERENCES categories(Id_cat)
);

ALTER TABLE articles
    ADD PRIMARY KEY (Id_art);

ALTER TABLE articles
    MODIFY Id_art INT(3) NOT NULL AUTO_INCREMENT;

-- Videos 
CREATE TABLE videos(
    Id_vid INT(3) NOT NULL,
    VideoURL TEXT NOT NULL
);

ALTER TABLE videos
    ADD PRIMARY KEY (Id_vid);