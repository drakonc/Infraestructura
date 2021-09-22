import { Router } from 'express';
import domainControllers from '../Controllers/domain.controllers';

class DomainRoute {
    public router: Router = Router();

    constructor(){
        this.Config();
    }

    private Config(): void {
        this.router.get("/getDomains", domainControllers.getDomains);
        this.router.get("/getDomain/:id/:codigo", domainControllers.getOneDominio);
        this.router.post("/createDomain", domainControllers.createDominio);
    }
}

const domainRouter = new  DomainRoute();
export default domainRouter.router;