CREATE TABLE IF NOT EXISTS transactions (
    id BIGINT NOT NULL AUTO_INCREMENT ,
    stock_id BIGINT NOT NULL  ,
    close_price decimal(19,4) NOT NULL ,
    open_price decimal(19,4) NOT NULL ,
    high_price decimal(19,4) NOT NULL ,
    low_price decimal(19,4) NOT NULL ,
    volume BIGINT NOT NULL ,
    exchange_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT fk_table_stock FOREIGN KEY (stock_id) REFERENCES stock(id),
    CONSTRAINT unique_stock_date UNIQUE (stock_id , exchange_date)
);