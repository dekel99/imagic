import combineRouters from "koa-combine-routers"
import shopRedact from "./gdpr/shop_redact.js"
import customersRedact from "./gdpr/customers_redact.js"
import customersDataRequest from "./gdpr/customers_data_request.js"

const userRoutes = combineRouters(
  shopRedact,
  customersRedact,
  customersDataRequest
); //add routers seaprated by a `,`

module.exports = userRoutes;
