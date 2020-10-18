import {Router} from "express";
import multer  from "multer";

import uploadConfig from "./config/upload";
import OrphanageControllers from "./Controllers/OrphanageControllers";
import UsersControllers from "./Controllers/UsersControllers";

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/orphanages', OrphanageControllers.index);
routes.get('/orphanage/:id', OrphanageControllers.show);
routes.post('/orphanages', upload.array('images') ,OrphanageControllers.create);

routes.post('/user', UsersControllers.create);

export default routes;

