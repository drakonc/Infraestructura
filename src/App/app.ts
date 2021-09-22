import express, { Application, Request, Response, NextFunction } from 'express';
import { configuration } from './Config/config';
import exphbs from 'express-handlebars';
import flash from 'connect-flash';
import passport from 'passport';
import session from 'express-session';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';


//Importar Rutas
import indexRouter from './Routers/index.routes';
import domainRouter from './Routers/domain.routes';

export class Aplicacion {
    
    private app: Application;
    private port?: number | string;
    private route: any[];

    constructor(port? : number | string) {
        this.port = port;
        this.app = express();
        this.route = [indexRouter,domainRouter];
        this.Settings();
        this.Middleware();
        this.Globals();
        this.Routes();
    }

    private Settings(): void {
        this.app.set('port', this.port || configuration.port || 4000);
        this.app.set("views", path.join(__dirname, "Views"));
        this.app.engine(".hbs", exphbs({
            defaultLayout: "main",
            layoutsDir: path.join(this.app.get("views"), "Layouts"),
            partialsDir: path.join(this.app.get("views"), "Partials"),
            extname: ".hbs"
          })
        );
        this.app.set("view engine", ".hbs");
        this.app.use(express.static(path.join(__dirname, "Public")))
    }

    private Middleware(): void {
        this.app.use(cors());
        this.app.use(flash());
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(passport.initialize());
        this.app.use(passport.session());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(session({secret: 'nodemysqlsession',resave: true,saveUninitialized: false}))
    }

    private Globals(){
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            this.app.locals.success = req.flash("success");
            this.app.locals.message = req.flash("message");
            this.app.locals.user = req.user;
            next();
          });
    }

    private Routes(): void {

        this.app.use(this.route);
    }

    public async Start() {
        await this.app.listen(this.app.get('port'), () => {
            console.log(`Servidor Corriendo en Puerto ${this.app.get('port')}`);
        });
    }
}