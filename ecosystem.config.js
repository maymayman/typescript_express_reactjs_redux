module.exports = {
  apps : [{
    name: "STOCK_APP",
    script: "build/index.js",
    env: {
      NODE_ENV: "development",
      MY_SQL_HOST: "localhost",
      MY_SQL_PASSWORD: "my-secret-pw",
      MY_SQL_DATABASE_NAME: "stock_develop",
      SQL_DIALECT: "mysql",
      MY_SQL_PORT: 3306,
      SECRET_KEY: "stock_secret_key_development",
      EXPIRE_TOKEN_TIME: 365 * 24 * 60 * 60,
      ENABLE_JOB: 0,
      PORT: 8000
    },
    env_production: {
      NODE_ENV: "production",
      MY_SQL_HOST: "localhost",
      MY_SQL_PASSWORD: "my-secret-pw",
      MY_SQL_DATABASE_NAME: "stock_prod",
      SQL_DIALECT: "mysql",
      MY_SQL_PORT: 3306,
      SECRET_KEY: "stock_secret_key_production",
      EXPIRE_TOKEN_TIME: 30 * 24 * 60 * 60,
      ENABLE_JOB: 1,
      PORT: 8000
    }
  }]
}
