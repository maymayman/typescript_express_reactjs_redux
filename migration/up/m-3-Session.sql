CREATE TABLE IF NOT EXISTS sessions (
    id BIGINT NOT NULL AUTO_INCREMENT,
    session LONGTEXT NOT NULL,
    user_id BIGINT NOT NULL ,
    device VARCHAR(255) ,
    device_id VARCHAR(200) ,
    expried_at DATETIME ,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT fk_table_user FOREIGN KEY (user_id) REFERENCES users(id)
)