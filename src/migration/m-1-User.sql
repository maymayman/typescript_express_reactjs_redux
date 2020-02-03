use sys;

create table Users (
    username VARCHAR(255) NOT NULL,
    password VARCHAR(200) NOT NULL
);

CREATE TABLE Persons (
    Personid int NOT NULL AUTO_INCREMENT,
    LastName varchar(255) NOT NULL,
    FirstName varchar(255),
    Age int,
    PRIMARY KEY (Personid)
);

INSERT INTO Users (username,password)
VALUES ('phanthong','thong123');