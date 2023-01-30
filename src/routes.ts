import { Router} from 'express';
import { ensureAuthenticateClient } from './middlewares/ensureAuthenticateClient';
import { ensureAuthenticateDeliveryman } from './middlewares/ensureAuthenticateDeliveryman';
import { AuthenticateClientController } from './modules/account/authenticateClient/AuthenticateClientController';
import { AuthenticateDeliverymanController } from './modules/account/authenticateDeliveryman/AuthenticateDeliverymanController';
import { FindAllDeliveriesController } from './modules/clients/deliveries/FindAllDeliveriesController';
import { CreateClientController } from './modules/clients/useCases/createClient/CreateClientController';
import { CreateDeliveryController } from './modules/deliveries/useCases/createDelivery/CreateDeliveryController';
import { FindAllAvailableController } from './modules/deliveries/useCases/findallAvailable/FindAllAvailableController';
import { UpdateDeliverymanController } from './modules/deliveries/useCases/updateDeliveryman/useCase/UpdateDeliverymanController';
import { UpdateEndDateController } from './modules/deliveries/useCases/updateEndDate/UpdateEndDateController';
import { CreateDeliverymanController } from './modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController.ts';
import { FindAllDeliveriesDeliverymanController } from './modules/deliveryman/useCases/findAlldeliveries/FindAllDeliveriesDeliverymanController';


const routes = Router();


const createClientController = new CreateClientController();
const authenticaClienteController = new AuthenticateClientController();
const createDeliverymanController = new CreateDeliverymanController();
const authenticateDeliverymanController = new AuthenticateDeliverymanController();
const deliveryCotroller = new CreateDeliveryController();
const findAllWithoutEndDateController = new FindAllAvailableController();
const updateDeliverymanController = new UpdateDeliverymanController();
const findAllDelivriesClient = new FindAllDeliveriesController();
const findAllDeliveriesDeliveryman = new FindAllDeliveriesDeliverymanController();
const updateEndDateController = new UpdateEndDateController();


routes.post('/client/authenticate', authenticaClienteController.handle);
routes.post('/deliveryman/authenticate', authenticateDeliverymanController.handle);
routes.post('/client/', createClientController.handle);
routes.post('/deliveryman', createDeliverymanController.handle);

routes.post('/delivery', ensureAuthenticateClient, deliveryCotroller.handle);
routes.get('/delivery/available', ensureAuthenticateDeliveryman, findAllWithoutEndDateController.handle);


routes.put('/delivery/updateDeliveryman/:id',ensureAuthenticateDeliveryman, updateDeliverymanController.handle);
routes.get('/client/deliveries',ensureAuthenticateClient, findAllDelivriesClient.handle);


routes.get('/deliveryman/deliveries', ensureAuthenticateDeliveryman, findAllDeliveriesDeliveryman.handle);
routes.put('/delivery/updateEndDate/:id', ensureAuthenticateDeliveryman, updateEndDateController.handle); 


export {routes}