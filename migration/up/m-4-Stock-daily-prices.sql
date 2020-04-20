CREATE TABLE IF NOT EXISTS stock_daily_prices (
    id BIGINT NOT NULL AUTO_INCREMENT ,
    stock_id BIGINT NOT NULL ,
    close_price decimal(19,4) NOT NULL ,
    open_price decimal(19,4) NOT NULL ,
    high_price decimal(19,4) NOT NULL ,
    low_price decimal(19,4) NOT NULL ,
    volume_price decimal(19,4) NOT NULL ,
    value_price decimal(19,4) NOT NULL ,
    stock_symbol varchar(255) NOT NULL UNIQUE,
    at_Date DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT fk_table_stock FOREIGN KEY (stock_id) REFERENCES stock(id)
);