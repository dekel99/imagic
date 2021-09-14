import "@babel/polyfill";
import dotenv from "dotenv";
import "isomorphic-fetch";
import createShopifyAuth, { verifyRequest } from "@shopify/koa-shopify-auth";
import Shopify, { ApiVersion } from "@shopify/shopify-api";
import Koa from "koa";
import next from "next";
import Router from "koa-router";
import routes from "./router/index";
import { updateTheme } from "./theme/updateTheme";
import Axios from "axios";
import { storeCallback, loadCallback, deleteCallback} from "./database/sessionStorage"
import MongoSession from "../server/database/mongo"
import webhookRouters from "../webhooks/_webhookRouters"
import webhooksRegistrar from "../webhooks/_webhooksRegistrar"
import userRoutes from "../routes/index"

dotenv.config();
const port = parseInt(process.env.PORT, 10) || 8081;
const dev = process.env.NODE_ENV !== "production";
const app = next({
  dev,
});
const handle = app.getRequestHandler();

const sessionStorage = new Shopify.Session.CustomSessionStorage(
  storeCallback,
  loadCallback,
  deleteCallback
);

Shopify.Context.initialize({
  API_KEY: process.env.SHOPIFY_API_KEY,
  API_SECRET_KEY: process.env.SHOPIFY_API_SECRET,
  SCOPES: process.env.SCOPES.split(","),
  HOST_NAME: process.env.HOST.replace(/https:\/\//, ""),
  API_VERSION: ApiVersion.October20,
  IS_EMBEDDED_APP: true,
  // This should be replaced with your preferred storage strategy
  SESSION_STORAGE: sessionStorage,
});

// Storing the currently active shops in memory will force them to re-login when your server restarts. You should
// persist this object in your app.
const ACTIVE_SHOPIFY_SHOPS = {}

app.prepare().then(async () => {
  const server = new Koa();
  const router = new Router();
  server.keys = [Shopify.Context.API_SECRET_KEY];
  server.use(
    createShopifyAuth({
      async afterAuth(ctx) {
        // Access token and shop available in ctx.state.shopify
        const { shop, accessToken, scope } = ctx.state.shopify;
        const host = ctx.query.host;
        // ACTIVE_SHOPIFY_SHOPS[shop] = scope;

        webhooksRegistrar(shop, accessToken)

        updateTheme(shop, accessToken)

        // Redirect to app with shop parameter upon auth
        ctx.redirect(`/?shop=${shop}&host=${host}`);
      },
    })
  );

  const handleRequest = async (ctx) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
    ctx.res.statusCode = 200;
  };

  router.post(
    "/graphql",
    verifyRequest({ returnHeader: true }),
    async (ctx, next) => {
      await Shopify.Utils.graphqlProxy(ctx.req, ctx.res);
    }
  );

  async function injectSession(ctx, next) {
    const session = await Shopify.Utils.loadCurrentSession(ctx.req, ctx.res)
    ctx.sessionFromToken = session
    if(session?.shop && session?.accessToken){
      const axios = await Axios.create({
        baseURL: `https://${session.shop}/admin/api/2021-01`,
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": session.accessToken
        }
      })
      ctx.axios = axios
      const client = new Shopify.Clients.Rest(session.shop, session.accessToken)
      ctx.myClient = client
    }
    return next();
  }

  server.use(injectSession);
  server.use(routes());
  router.get("(/_next/static/.*)", handleRequest); // Static content is clear
  router.get("/_next/webpack-hmr", handleRequest); // Webpack content is clear
  router.get("(.*)", async (ctx) => {
    const shop = ctx.query.shop;
    const foundSessions = await MongoSession.find({ shop })

    if (foundSessions.length !== 2 || foundSessions[1].content.expires < Date.now()) {
      await MongoSession.deleteMany({ shop })
      ctx.redirect(`/auth?shop=${shop}`)
    } else {
      await handleRequest(ctx)
    }
  });

  server.use(webhookRouters())
  server.use(userRoutes())

  server.use(router.allowedMethods())
  server.use(router.routes())
  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`)
  });
});
