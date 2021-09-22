import { Request, Response } from 'express';
import { DBConection, querys, sql } from '../DataBase';

class DomainController {

    public async getDomains(req: Request, res: Response): Promise<any> {
        try {
            const db = new DBConection();
            const pool = await db.getConnection();
            const result = await pool?.request().execute(querys.ListarDominios);
            const data = result?.recordset;
            const rowsAffected = result?.rowsAffected[0];
            pool?.close();
            res.status(200).json({ status: 200, rowsAffected, data });
        } catch (error) {
            res.status(500);
            res.json({status: 500, mensaje: error});
        }
    }

    public async getOneDominio (req: Request, res: Response): Promise<any> {
        const {id, codigo} = req.params
        try
        {   
            const db = new DBConection();
            const pool = await db.getConnection();
            const result = await pool?.request().input("CODIGO", sql.VarChar, codigo).input("IDDOMINIO",sql.Int, id).execute(querys.ListarDominio);
            const data = result?.recordset[0];
            const rowsAffected = result?.rowsAffected[0];
            pool?.close();
            res.status(200).json({ status: 200, rowsAffected, data });
        } catch (error) {
            res.status(500);
            res.json({status: 500, mensaje: error});
        }
    }

    public async createDominio(req: Request, res: Response): Promise<any> {
        const { Nombre, Usuario, Contraseña } = req.body;
        try {
            const db = new DBConection();
            const pool = await db.getConnection();
            const result = await pool?.request()
                           .input("NOMBRE",sql.VarChar,Nombre.toUpperCase())
                           .input("USUARIO",sql.VarChar,Usuario.toUpperCase())
                           .input("CONTRASENA",sql.VarChar,Contraseña.toUpperCase())
                           .output("ID",sql.Int)
                           .output("RESULTADO",sql.Int)
                           .execute(querys.CrearDominio);
            const resultado = result?.output.RESULTADO
            if (resultado == 0){
                const data = result?.recordset[0];
                res.status(200).json({status: 200, mensaje: "Usuario Creado",data: data});
            }
            if (resultado == -1){
                const data = result?.recordset[0];
                res.status(200).json({status: 200, mensaje: "Usuario ya Existe",data: data});
            }
        } catch(error) {
            res.status(500);
            res.json({status: 500, mensaje: error});
        }
    }

}

const domain = new DomainController();
export default domain;