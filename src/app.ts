import express from 'express';
import multer from 'multer';
import path from 'path';
import mysql from 'mysql';
import MainController from './controllers/main_controller';
import ConfigurationReader from './util/json_file_reader';
import AppConstants from './util/app_constants';
const upload = multer();
const app = express();

/*
 * Setup Express
 */


/*
 * Setup MySQL Connection Pool 
 */
const config = ConfigurationReader.getMySQLPoolConfig(path.join(__dirname,'configuration/database.json'));
const connectionPool = mysql.createPool(config);
app.set(AppConstants.MYSQL_CONNECTION_POOL,connectionPool);

/*
 * Setup Data Access Objects
 */



app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(MainController);

app.listen(8000, ()=> {
    console.log("app is running")
});