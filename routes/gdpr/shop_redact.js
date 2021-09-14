/*
Payload
 {
  shop_id: 954889,
  shop_domain: "snowdevil.myshopify.com",
};
*/

import Router from "koa-router"
const shopRedact = new Router();

shopRedact.post("/app/gdpr/shop_redact", async (ctx) => {
  console.log(ctx.request.body);
  ctx.status(200)
});

module.exports = shopRedact;
