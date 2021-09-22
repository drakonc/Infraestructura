import sql from "mssql";
import { dbSettings } from './dbSettings';

export class DBConection {
    
    public dbSettings = dbSettings;

    public async getConnection() {
        try {
            const pool = await sql.connect(this.dbSettings);
            return pool;
        } catch (error) {
            console.error(error);
        }
    }
}

export { sql };