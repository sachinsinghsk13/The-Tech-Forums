import express from 'express';
import multer from 'multer';
import path from 'path';
import mysql from 'mysql';
import MainController from './controllers/main_controller';
import ConfigurationReader from './util/json_file_reader';
import AppConstants from './util/app_constants';
import ForumDao from './dao/forum_dao';
import TopicDao from './dao/topic_dao';
import PostDao from './dao/post_dao';
import UserDao from './dao/user_dao';
import ForumService from './services/forums_service';
import ForumController from './controllers/forum_controller';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import TopicController from './controllers/topics_controller';
import TopicService from './services/topics_service';
import nodemailer from 'nodemailer';
import EmailClient from './util/email_client';
import AccountsController from './controllers/account_controller';
import session from 'express-session';
import { sessionProviderForViews } from './controllers/middlewares/authentication-helpers';
const upload = multer();
const app = express();

/*
 * Setup Express
 */

app.set('view engine','pug');
app.set('views',path.join(__dirname,'../views'));
app.use(express.static(path.join(__dirname, '../public')));
app.use(session({secret:'this is the session'}));
app.use(sessionProviderForViews);
app.use(bodyParser.urlencoded({extended: true})); // 
app.use(bodyParser.json());

/*
 *  Setup Email Client 
 */
const emailConfig = ConfigurationReader.getConfiguration(path.join(__dirname, '../configuration/email.json'));
const transporter = nodemailer.createTransport(emailConfig);
const emailClient = new EmailClient(transporter);
app.set(AppConstants.EMAIL_CLIENT, emailClient);

/*
 * Setup MySQL Connection Pool 
 */
const config = ConfigurationReader.getMySQLPoolConfig(path.join(__dirname,'../configuration/database.json'));
const connectionPool = mysql.createPool(config);
app.set(AppConstants.MYSQL_CONNECTION_POOL,connectionPool);

/*
 * Setup Data Access Objects
 */

// -- SQL Quries
const sqlQueries = ConfigurationReader.getConfiguration(path.join(__dirname,'../configuration/sql_queries.json'));

// -- User Dao
const userDao = new UserDao(connectionPool,sqlQueries);
app.set(AppConstants.USER_DAO,userDao);

// -- Forum Dao
const forumDao = new ForumDao(connectionPool, sqlQueries);
app.set(AppConstants.FORUM_DAO, forumDao);

const topicDao = new TopicDao(connectionPool, sqlQueries);
app.set(AppConstants.TOPIC_DAO, topicDao);

const postDao = new PostDao(connectionPool, sqlQueries);
app.set(AppConstants.POST_DAO, postDao);

/*
 * Setup Services
 */

const forumService = new ForumService(forumDao, topicDao);
app.set(AppConstants.FORUM_SERVICE, forumService);

const topicService = new TopicService(topicDao);
app.set(AppConstants.TOPIC_SERVICE, topicService);

/*
 * Setup Route Controllers
 */

app.use(MainController);
app.use(ForumController);
app.use(TopicController);
app.use(AccountsController);
app.listen(8000, ()=> {
    console.log("app is running")
});