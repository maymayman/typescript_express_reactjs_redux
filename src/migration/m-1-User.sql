use sys;

create table Users (
    id int NOT NULL AUTO_INCREMENT ,
    username VARCHAR(255) NOT NULL UNIQUE ,
    password VARCHAR(200) NOT NULL,
    phone int NOT NULL ,
    created_at varchar(255) ,
    updated_at varchar(255) ,
    deleted_at varchar(255) ,
    PRIMARY KEY (id)
);


INSERT INTO Users (username,password,phone)
VALUES ('phanthong','thong123','0123456556');
