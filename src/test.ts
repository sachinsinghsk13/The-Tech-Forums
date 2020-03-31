import OTPGenerator from "./util/otp_generator";

console.log(OTPGenerator.generateOTP());










// import ConfigurationReader from "./util/json_file_reader";
// import AppConstants from "./util/app_constants";
// import mysql from 'mysql';
// import path from 'path';
// import UserDao from "./dao/user_dao";

// const config = ConfigurationReader.getMySQLPoolConfig(path.join(__dirname,'configuration/database.json'));
// const connectionPool = mysql.createPool(config);

// const sqlQueries = ConfigurationReader.getSQLQueries(path.join(__dirname,'dao/sql_queries.json'));



// const userDao = new UserDao(connectionPool, sqlQueries);

// userDao.getMySQLVersion((err, version) => {
//     if (err)
//         throw err;
// })




// connectionPool.getConnection((err, con) => {
//     con.query(sqlQueries['show_table'], (err, result, field) => {
//         if (err)
//             throw err;
//         result.forEach((element : any) => {
//             console.log(element.Tables_in_TheTechForums);
//         });
//     });
// })
