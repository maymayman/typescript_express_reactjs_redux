CREATE TABLE IF NOT EXISTS stock (
    id BIGINT NOT NULL AUTO_INCREMENT,
    stock_name varchar(255) UNIQUE,
    stock_price Float(24) NOT NULL,
    stock_date DATETIME ,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);