import { Pool } from "mysql";

export default class PostDao {
    private connectionPool: Pool;
    private sql: any;
    constructor(pool: Pool, sqlQuries: any) {
        this.connectionPool =pool;
        this.sql = sqlQuries;
    }
} 