import { receiveWebhook, registerWebhook } from "@shopify/koa-shopify-webhooks"
import MongoSession from "../server/database/mongo"
import Router from "koa-router"

const webhook = receiveWebhook({ secret: process.env.SHOPIFY_API_SECRET });
const appUninstallRoute = new Router();

// Register of webhook (fired adress when uninstall)
const appUninstallWebhook = async (shop, accessToken) => {
  try{
    const webhookStatus = await registerWebhook({
      address: `${process.env.HOST}/webhooks/app/uninstall`,
      topic: "APP_UNINSTALLED",
      accessToken,
      shop,
      apiVersion: process.env.SHOPIFY_API_VERSION,
    });

    webhookStatus.success
      ? console.log(`--> Successfully registered uninstall webhook for ${shop}`)
      : console.log(
          "--> Failed to register uninstall webhook",
          webhookStatus.result.data.webhookSubscriptionCreate.userErrors
        );
  } catch(e) {
    console.log(e.message)
  }
};

// Fired when client uninstall app
appUninstallRoute.post("/webhooks/app/uninstall", webhook, async (ctx) => {
  const shop = ctx.state.webhook.payload.domain;
  await MongoSession.deleteMany({ shop });
  console.log(`--> Deleted records for ${shop}`);
});

module.exports = { appUninstallWebhook, appUninstallRoute };
