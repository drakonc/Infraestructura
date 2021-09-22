import { Request, Response } from 'express';
import { DBConection } from '../DataBase';

class IndexController {

    public async Index (req: Request, res: Response) {
        res.status(200).json({ message: 'Hola Mundo' });
    }

    public async getConection (req: Request, res: Response) {
        const db = new DBConection()
        const pool = await db.getConnection();
        const result = await pool?.request().query("SELECT 1 + 1");
        const data = result?.recordset;
        const rowsAffected = result?.rowsAffected[0]
        pool?.close();
        res.status(200).json({ status: 200, rowsAffected, data });
    }

}

const index = new IndexController();
export default index;