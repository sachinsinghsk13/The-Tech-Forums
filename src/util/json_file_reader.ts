import fs from 'fs';
import { PoolConfig } from 'mysql';
export default class ConfigurationReader {
    constructor() {

    }
    static getMySQLPoolConfig(location: string) : PoolConfig {
        let json = fs.readFileSync(location).toString();
        return JSON.parse(json);
    }

    static getConfiguration(location: string): any {
        let json = fs.readFileSync(location).toString();
        return JSON.parse(json);
    }
}