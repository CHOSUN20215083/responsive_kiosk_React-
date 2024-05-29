//const mysql = require("mysql");
const { cookie } = require("express/lib/response");
const sql = require("mssql");
const dbConfig = require("../config/db.config.js");

// var connection = mysql.createPool({
//   host: dbConfig.HOST,
//   user: dbConfig.USER,
//   password: dbConfig.PASSWORD,
//   database: dbConfig.DB,
//   server:dbConfig.HOST,
// });

const config = {  
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  server:dbConfig.HOST,  
  options: {  
      // 这里设置 tedious 的配置选项  
      enableArithAbort: true,  
    trustedConnection: false,
      trustServerCertificate: true // 绕过 SSL/TLS 证书验证  
      // 如果需要，还可以设置其他 Tedious 选项  
  }  
};
console.log("username: "+ config.user)
console.log("password: "+ config.password)
// 创建一个自定义的连接池  
const poolPromise = new sql.ConnectionPool(config)  
    .connect()  
    .then(pool => {  
        console.log('Connected to MSSQL');  
        // 现在你可以使用 pool.request() 来执行查询  
        return pool;  
    })  
    .catch(err => {  
        // 处理连接错误  
        console.log('Database Connection Failed', err.message);  
    }); 

module.exports = poolPromise;
