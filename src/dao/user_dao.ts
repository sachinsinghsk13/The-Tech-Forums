import { Pool, MysqlError } from "mysql";
import User from "../model/user";
import NewUserApplicant from "../model/new-user-applicant";
import Avtar from "../model/avtar";

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
                    conn.release();
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
    
    createAccount(user: NewUserApplicant) : Promise<number> {
        return new Promise((resolve, reject) => {
            this.connectionPool.getConnection((err, conn) => {
                if (err)
                    reject(err);
                conn.query(this.sql['create_account'], [user.name, user.username, user.email, user.gender, user.password], (err, result) => {
                    conn.release();
                    if (err)
                        reject(err);
                    else
                        resolve(result.insertId);
                });
            });
        });
    }
    getAvtars() : Promise<Avtar[]> {
        return new Promise((resolve, reject) => {
            this.connectionPool.getConnection((err, conn) => {
                if (err)
                    reject(err);
                else
                    conn.query(this.sql['get_avtars'],(err, result) => {
                        conn.release();
                        if (err)
                            reject(err);
                        else {
                            let avtars: Avtar[] = [];
                            for (let i = 0; i < result.length; i++) {
                                let a = new Avtar(result[i]['AVTAR_ID'],result[i]['IMAGE_URL']);
                                avtars.push(a);
                            }
                            resolve(avtars);
                        }
                    });
            })
        });
    }
    getUserByUsername(username: string) : Promise<User> {
        return new Promise((resolve, reject) => {
            this.connectionPool.getConnection((err, conn) => {
                if (err)
                    reject(err);
                else
                    conn.query(this.sql['get_user_by_username'],[username],(err, result) => {
                        conn.release();
                        if (err)
                            reject(err);
                        else {
                            let u = result[0];
                            let avtar = new Avtar(u.avtar_id, u.image_url);
                            let user = new User(u.username, u.email,u.profession,u.name,u.gender,u.birthday,u.user_id,u.city,u.state,u.bio,avtar);
                            resolve(user);
                        }
                    });
            });
        });
    }

    updateProfile(user: User) : Promise<number> {
        return new Promise((resolve, reject) => {
            this.connectionPool.getConnection((err, conn) => {
                if (err)
                    reject(err);
                else {
                    let birthday = "NULL";
                    let query = this.sql['update_profile_birthday'];
                    let param = [user.profession, user.bio, user.city, user.state, user.avtar?.id, user.username];
                    if (user.birthday) {
                        let birthday = `${user.birthday.getFullYear()}-${user.birthday.getMonth() + 1}-${user.birthday.getDate()}`;
                        query = this.sql['update_profile'];
                        param.splice(1, 0, birthday);
                    }
                    conn.query(query,param,(err, result) => {
                        conn.release();
                        if (err)
                            reject(err);
                        else {
                            resolve(result.affectedRows);
                        }
                    });
                }
                    
            });
        });
    }
} 