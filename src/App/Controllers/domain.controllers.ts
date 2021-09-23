import { Request, Response } from 'express';
import { DBConection, querys, sql } from '../DataBase';

class DomainController {

    public async getViewDomain(req: Request, res: Response){
        try {
            const db = new DBConection();
            const pool = await db.getConnection();
            const result = await pool?.request().execute(querys.ListarDominios);
            const data = result?.recordset;
            const url = req.url;
            pool?.close();
            res.render("Domain/index", {data, url});
        } catch (error) {
            res.status(500);
            res.json({status: 500, mensaje: error});
        }
    }

    public viewAddDomain(req: Request, res: Response){
        const url = '/viewDomains';
        res.render("Domain/add", {url})
    }

    public async postAddDomain(req: Request, res: Response){
        const { Nombre, Usuario, Contrasena } = req.body;
        try {
            const db = new DBConection();
            const pool = await db.getConnection();
            const result = await pool?.request()
                           .input("NOMBRE",sql.VarChar,Nombre.toUpperCase())
                           .input("USUARIO",sql.VarChar,Usuario.toUpperCase())
                           .input("CONTRASENA",sql.VarChar,Contrasena.toUpperCase())
                           .output("ID",sql.Int)
                           .output("RESULTADO",sql.Int)
                           .execute(querys.CrearDominio);
            pool?.close();
            const resultado = result?.output.RESULTADO
            if (resultado == 0){
                req.flash('success','Usuario Creado');
                res.redirect('/viewDomains');
            }
            if (resultado == -1){
                const data = result?.recordset[0];
                req.flash('message','Usuario Ya Existe');
                res.redirect('/viewAddDomain');
            }
        } catch(error) {
            res.status(500);
            res.json({status: 500, mensaje: error});
        }
    }

    public async viewEditDomain (req: Request, res: Response): Promise<any> {
        try
        {   
            const url = '/viewDomains';
            const {id, codigo} = req.params
            const db = new DBConection();
            const pool = await db.getConnection();
            const result = await pool?.request().input("CODIGO", sql.VarChar, codigo).input("IDDOMINIO",sql.Int, id).execute(querys.ListarDominio);
            const data = result?.recordset[0];
            pool?.close();
            if (data != null) res.render("Domain/edit", {url,data})
            else{
                req.flash('message','Usuario No Existe');
                res.redirect('/viewAddDomain');
            };
        } catch (error) {
            res.status(500);
            res.json({status: 500, mensaje: error});
        }  
    }

}

const domain = new DomainController();
export default domain;