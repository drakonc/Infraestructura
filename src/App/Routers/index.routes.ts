import { Router } from 'express';
import indexControllers from '../Controllers/index.controllers';

class IndexRoute {
    public router: Router = Router();

    constructor(){
        this.Config();
    }

    private Config(): void {
        this.router.get("/", indexControllers.Index);
        this.router.get("/getConection", indexControllers.getConection);
    }
}

const indexRouter = new  IndexRoute();
export default indexRouter.router;