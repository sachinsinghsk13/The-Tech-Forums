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
                    else if (result.length) {
                        let u = result[0];
                            let avtar = new Avtar();
                            avtar.id = u.avtar_id;
                            avtar.filename = u.image_url;

                            let user = new User();
                            user.username = u.username;
                            user.email = u.email;
                            user.profession = u.profession;
                            user.name = u.name;
                            user.gender = u.gender;
                            user.setBirthday(u.birthday);
                            user.userId = u.user_id;
                            user.city = u.city;
                            user.state = u.state;
                            user.bio = u.bio;
                            user.avtar = avtar;
                            resolve(user);
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
                                let a = new Avtar();
                                a.filename = result[i]['IMAGE_URL'];
                                a.id = result[i]['AVTAR_ID'];
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
                            let avtar = new Avtar();
                            avtar.id = u.avtar_id;
                            avtar.filename = u.image_url;
                            let user = new User();
                            user.username = u.username;
                            user.email = u.email;
                            user.profession = u.profession;
                            user.name = u.name;
                            user.gender = u.gender;
                            user.setBirthday(u.birthday);
                            user.userId = u.user_id;
                            user.city = u.city;
                            user.state = u.state;
                            user.bio = u.bio;
                            user.avtar = avtar;
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