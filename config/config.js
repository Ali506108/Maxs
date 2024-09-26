
// const fs = require('fs')
// const path = require('path')
module.exports = {
    development: {
        username: process.env.DB_USER || 'admin',
        password: process.env.DB_PASSWORD || 'admin',
        database: process.env.DB_NAME || 'admin',
        host: 'localhost',
        dialect: 'postgres',
        port: 5432,
        logging: false, 
          
        
    },
 
    // production: {
    //     username: 'doadmin',
    //     password:  process.env.PASSWORD_ENV, 
    //     database: 'defaultdb',
    //     host: 'db-postgresql-fra1-08497-do-user-17092848-0.c.db.ondigitalocean.com',
    //     dialect: 'postgres',
    //     port : 25060,
    //     dialectOptions: {
    //         ssl: {
    //             ca: fs.readFileSync(path.resolve('config', 'ca-certificate.crt')),
    //         }
    //     }
    // }
};
