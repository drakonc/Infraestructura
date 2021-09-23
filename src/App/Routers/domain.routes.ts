import { Router } from 'express';
import domainControllers from '../Controllers/domain.controllers';

class DomainRoute {
    public router: Router = Router();

    constructor(){
        this.Config();
    }

    private Config(): void {
        this.router.get("/viewDomains", domainControllers.getViewDomain);
        this.router.get("/viewAddDomain",domainControllers.viewAddDomain);
        this.router.post("/postAddDomain", domainControllers.postAddDomain);
        this.router.get("/viewEditDomain/:id/:codigo", domainControllers.viewEditDomain);
    }
}

const domainRouter = new  DomainRoute();
export default domainRouter.router;