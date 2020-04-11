import { Pool } from "mysql";
import Post from "../model/post";

export default class PostDao {
    private connectionPool: Pool;
    private sql: any;
    constructor(pool: Pool, sqlQuries: any) {
        this.connectionPool =pool;
        this.sql = sqlQuries;
    }

    postReply(post: Post) : Promise<number> {
        return new Promise((resolve, reject) => {
            this.connectionPool.getConnection((err, conn) => {
                if (err)
                    reject(err);
                else
                    conn.query(this.sql['post_reply'],[post.topic?.topicId, post.postedBy?.userId, post.content],(err, result) => {
                        conn.release();
                        if (err)
                            reject(err);
                        else
                            resolve(result.insertId);
                    })
            });
        });
    }
} 