import { Router } from 'express';
import domainControllers from '../Controllers/domain.controllers';

class DomainRoute {
    public router: Router = Router();

    constructor(){
        this.Config();
    }

    private Config(): void {
        this.router.get("/viewDomains", domainControllers.getViewDomain);
    }
}

const domainRouter = new  DomainRoute();
export default domainRouter.router;