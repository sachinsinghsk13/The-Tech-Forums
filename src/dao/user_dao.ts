import { Pool, MysqlError } from "mysql";
import User from "../model/user";

export default class UserDao {
    private connectionPool: Pool;
    private sql: any;
    constructor(pool: Pool, sqlQuries: any) {
        this.connectionPool = pool;
        this.sql = sqlQuries;
    }

    authenticate(username: string, password: string): Promise<User> {
        return new Promise((resolve, reject) => {
            this.connectionPool.getConnection((err, conn) => {
                if (err)
                    reject(err);
                conn.query(this.sql['authenticate_user'], [username, password], (err, result) => {
                    if (err)
                        reject(err)
                    if (result.length) {
                        let user = result[0];
                        resolve(
                            new User(
                                user.user_id,
                                user.username,
                                user.email,
                                user.profession,
                                user.name,
                                user.birthdate,
                                user.gender
                            ));
                    }
                    else
                        reject(new Error('User Not Found!'));
                });
            });
        });
    }

    insertUser(user: User) : Promise<User> {
        return new Promise((resolve, reject) => {
            this.connectionPool.getConnection((err, conn) => {
                if (err)
                    reject(err);
                conn.query(this.sql['insert_user'], [user.name, user.username, user.email,user.profession, user.birthDate, user.gender, user.password], (err, result) => {
                    if (err)
                        reject(err);
                    user.userId = result.insertId;
                    resolve(user);
                });
            });
        });
    }

    
} 