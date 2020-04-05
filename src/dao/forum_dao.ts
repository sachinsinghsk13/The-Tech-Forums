import { Pool } from "mysql";
import Category from "../model/category";
import Forum from "../model/forum";
import ForumTopics from "../model/interfaces/forum_topics";
import ForumPosts from "../model/interfaces/forum_posts";

export default class ForumDao {
    private connectionPool: Pool;
    private sql: any;
    constructor(pool: Pool, sqlQuries: any) {
        this.connectionPool =pool;
        this.sql = sqlQuries;
    }

    getAllForumsInCategories() : Promise<any> {
        return new Promise((resolve, reject) => {
            this.connectionPool.getConnection((err, conn) => {
                if (err)
                    reject(err);
                conn.query(this.sql['all_forums'],(err, result) => {
                    if (err)
                        reject(err);
                    resolve(result);
                });
            })
        });
    }

    getTopicCountInForums() : Promise<ForumTopics> {
        return new Promise((resolve, reject) => {
            this.connectionPool.getConnection((err, conn) => {
                if (err)
                    reject(err);
                conn.query(this.sql['total_topics_in_forums'],(err, result) => {
                    if (err)
                        reject(err);
                    resolve(result);
                });
            })
        });
    }

    getPostCountInForums(): Promise<ForumPosts> {
        return new Promise((resolve, reject) => {
            this.connectionPool.getConnection((err, conn) => {
                if (err)
                    reject(err);
                conn.query(this.sql['total_posts_in_forums'],(err, result) => {
                    if (err)
                        reject(err);
                    resolve(result);
                });
            });
        })
    }
} 