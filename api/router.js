import express from 'express';
const router = express.Router();

import {product_routes} from './endpoints/products.js'
import {stores_routes} from './endpoints/stores.js'
import {stocks_routes} from './endpoints/stocks.js'
import {auth_routes} from './endpoints/auth.js'
import {get_profile} from './endpoints/getprofile.js'
import {taxes_routes} from './endpoints/taxes.js'
import {service_routes} from './endpoints/services.js'
import {permission_user_routes} from './endpoints/permissions_user.js'
import {company_routes} from './endpoints/company.js'

// Define your /books routes within a function
const routes = (router) => {
    product_routes(router);
    auth_routes(router);
    get_profile(router);
    stores_routes(router);
    stocks_routes(router);
    taxes_routes(router);
    service_routes(router);
    permission_user_routes(router);
    company_routes(router);
};
// Call the function to define the /books routes
routes(router);
export default router;