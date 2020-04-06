import { Pool } from "mysql";
import { resolve } from "dns";

export default class TopicDao {
    private connectionPool: Pool;
    private sql: any;
    constructor(pool: Pool, sqlQuries: any) {
        this.connectionPool =pool;
        this.sql = sqlQuries;
    }

    getTopicsInForum(id: number) : Promise<any> {
        return new Promise((resolve, reject) => {
            this.connectionPool.getConnection((err, conn) => {
                
                if (err)
                    reject(err);
                conn.query(this.sql['all_topics_in_forum'],[id],(err, result) => {
                    conn.release();
                    if (err)
                        reject(err);
                    resolve(result);
                })
            });
        });
    }

    getPostsCountInTopics(id: number) : Promise<any> {
        return new Promise((resolve, reject) => {
            this.connectionPool.getConnection((err, conn) => {
                if (err)
                    reject(err);
                conn.query(this.sql['total_posts_in_topics_in_forum'],[id],(err, result) => {
                    conn.release();
                    if (err)
                        reject(err);
                    resolve(result);
                })
            });
        });
    }
    //total_posts_in_topics_in_forum
    getTotalPostCountInTopicsOfForum(id: number): Promise<any>{
        return new Promise((resolve, reject) => {
            this.connectionPool.getConnection((err, conn) => {
                if (err)
                    reject(err);
                conn.query(this.sql['total_posts_in_topics_in_forum'],[id],(err, result) => {
                    conn.release();
                    if (err)
                        reject(err);
                    resolve(result);
                })
            })
        });
    }

    getTopic(id: number) : Promise<any> {
        return new Promise((resolve, reject) => {
            this.connectionPool.getConnection((err, conn) => {
                if (err)
                    reject(err);
                conn.query(this.sql['get_topic'],[id],(err, result) => {
                    conn.release();
                    if (err)
                        reject(err);
                    resolve(result);    
                });
            });
        });
    }

    getPostsInTopic(id: number) : Promise<any> {
        return new Promise((resolve, reject) => {
            this.connectionPool.getConnection((err, conn) => {
                if (err)
                    reject(err);
                conn.query(this.sql['get_posts_in_topic'],[id],(err, result) => {
                    conn.release();
                    if (err)
                        reject(err);
                    resolve(result);
                });
            });
        });
    }

} 