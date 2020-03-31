import { Pool } from "mysql";

export default class UserDao {
    private connectionPool: Pool;
    constructor(pool: Pool) {
        this.connectionPool =pool;
    }
} 