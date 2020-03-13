CREATE TABLE IF NOT EXISTS session_users (
    id BIGINT NOT NULL AUTO_INCREMENT,
    token VARCHAR(255) NOT NULL,
    users_id BIGINT NOT NULL  ,
    device VARCHAR(255) ,
    device_id BIGINT ,
    expried_at DATETIME ,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT fk_table_user FOREIGN KEY (users_id) REFERENCES users(id)
)