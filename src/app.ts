import express from 'express';
import multer from 'multer';
import path from 'path';
import mysql from 'mysql';
import MainController from './controllers/main_controller';
import ConfigurationReader from './util/json_file_reader';
import AppConstants from './util/app_constants';
import UserDao from './dao/user_dao';
import ForumDao from './dao/forum_dao';
import TopicDao from './dao/topic_dao';
import PostDao from './dao/post_dao';
const upload = multer();
const app = express();

/*
 * Setup Express
 */

app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname, 'public')));

/*
 * Setup MySQL Connection Pool 
 */
const config = ConfigurationReader.getMySQLPoolConfig(path.join(__dirname,'configuration/database.json'));
const connectionPool = mysql.createPool(config);
app.set(AppConstants.MYSQL_CONNECTION_POOL,connectionPool);

/*
 * Setup Data Access Objects
 */

// -- SQL Quries
const sqlQueries = ConfigurationReader.getSQLQueries(path.join(__dirname,'dao/sql_queries.json'));

// -- User Dao
const userDao = new UserDao(connectionPool,sqlQueries);
app.set(AppConstants.USER_DAO,userDao);

// -- Forum Dao
const forumDao = new ForumDao(connectionPool, sqlQueries);
app.set(AppConstants.FORUM_DAO, forumDao);

const topicDao = new TopicDao(connectionPool, sqlQueries);
app.set(AppConstants.TOPIC_DAO, sqlQueries);

const postDao = new PostDao(connectionPool, sqlQueries);
app.set(AppConstants.POST_DAO, postDao);

/*
 * Setup Route Controllers
 */

app.use(MainController);

app.listen(8000, ()=> {
    console.log("app is running")
});