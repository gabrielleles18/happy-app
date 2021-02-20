import {Router} from "express";
import multer  from "multer";

import uploadConfig from "./config/upload";
import OrphanageControllers from "./Controllers/OrphanageControllers";
import UsersControllers from "./Controllers/UsersControllers";
import SessionController from "./Controllers/SessionController";

import authMiddleware from "./middlewares/auth";

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/orphanages', OrphanageControllers.index);
routes.get('/orphanage/:id', OrphanageControllers.show);

routes.post('/user', UsersControllers.create)

routes.post('/sessions', SessionController.store);


routes.put('/user/edit', UsersControllers.update);
routes.post('/orphanages', upload.array('images') ,OrphanageControllers.create);

routes.use(authMiddleware);

export default routes;

