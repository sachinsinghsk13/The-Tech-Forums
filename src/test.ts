import mysql from 'mysql';
import path from 'path';
import UserDao from './dao/user_dao';
import ConfigurationReader from './util/json_file_reader';
import User from './model/user';
import Category from './model/category';
import ForumDao from './dao/forum_dao';
import Forum from './model/forum';
import ForumService from './services/forums_service';
import TopicDao from './dao/topic_dao';
import TopicService from './services/topics_service';
import NewUserApplicant from './model/new-user-applicant';

const pool = mysql.createPool({
    host:'localhost',
    user:'sachinsingh',
    password:'root123',
    database:'TheTechForums'
});

const sqlQueries = ConfigurationReader.getConfiguration(path.join(__dirname,'../configuration/sql_queries.json'));
const dao = new ForumDao(pool,sqlQueries);
const service = new UserDao(pool, sqlQueries);
(async function() {
    try {
        let user = new NewUserApplicant('Sachin Singh', 'sachinsinghsk13','sachinsingh.sk13@gmail.com','MALE','mypass','343');
       let forum = await service.getUserByUsername('sachinsinghsk13');
       console.log(forum);
      // console.log(forum);
    } catch (error) {
        console.log("My Error : "+error);
    }
})();
// ul
// for category in categories
//     li= category.categoryId
//     li= category.name
//     li= category.description
//     li
//         ul
//             for forum in category.forums
//                 li= forum.forumId
//                 li= forum.title
//                 li= forum.description
//                 li= forum.prettyDate

           

