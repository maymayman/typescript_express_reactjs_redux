echo "install dependencies             : ===> install dependencies"
git checkout -- package-lock.json 
git pull origin develop
rm -rf node_modules
rm -rf package-lock.json
npm install

echo "lint                             : ===> check syntax"
npm run lint:fix

echo "quality                          : ===> run unitest"
npm run test:cov

echo "build                            : ===> build project"
npm run build

echo "migration up                     : ===> migrate database"
MY_SQL_HOST=localhost MY_SQL_PASSWORD=my-secret-pw MY_SQL_DATABASE_NAME=stock_develop MY_SQL_PORT=3307 npm run migration:up

echo "deploy app                       : ===> deploy application"
pm2 start ecosystem.config.js --env development
