use sys;

CREATE TABLE IF NOT EXISTS Users (
    id int NOT NULL AUTO_INCREMENT ,
    username VARCHAR(255) NOT NULL UNIQUE ,
    password VARCHAR(200) NOT NULL,
    phone int NOT NULL ,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
    updated_at DATETIME ,
    deleted_at DATETIME ,
    PRIMARY KEY (id)
);