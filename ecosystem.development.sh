echo "lint                             : ===> check syntax"
npm run lint:fix

echo "install dependencies             : ===> check syntax"
rm -rf node_modules
rm -rf package-lock.json
npm install

echo "quality                          : ===> run unitest"
npm run test:cov

echo "build                            : ===> build project"
npm run build

echo "migration up                     : ===> migrate database"
MY_SQL_HOST=localhost MY_SQL_PASSWORD=my-secret-pw MY_SQL_DATABASE_NAME=stock_develop MY_SQL_PORT=3307 npm run migration:up

echo "deploy app                       : ===> deploy application"
pm2 start ecosystem.config.js --env development