import mysql from 'mysql';
import path from 'path';
import UserDao from './dao/user_dao';
import ConfigurationReader from './util/json_file_reader';
import User from './model/user';
import Category from './model/category';
import ForumDao from './dao/forum_dao';
import Forum from './model/forum';

const pool = mysql.createPool({
    host:'localhost',
    user:'sachinsingh',
    password:'root123',
    database:'TheTechForums'
});

const sqlQueries = ConfigurationReader.getSQLQueries(path.join(__dirname,'../configuration/sql_queries.json'));
const dao = new ForumDao(pool,sqlQueries);
// (async function() {
//     try {
//        let cate =  await dao.getAllForumsInCategories();
//         cate.forEach(cat => {
//             cat.forums?.forEach((f) => {
//                 console.log(f);
//             });
//         });
//     } catch (error) {
//         console.log("My Error : "+error);
//     }
// })();
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

           

