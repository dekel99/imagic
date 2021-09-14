import Router from "koa-router";
import { createScriptTag, deleteScriptTag, getAllScriptTags, updateScriptTag } from "../controllers/script_tag_controller";
import { getTheme } from "../theme/getTheme";

const router = new Router({ prefix: "/script_tag" });

router.get("/", async (ctx) => {
  ctx.body = "get scrpit";
});

router.get("/all", async (ctx) => {
  const res = await getAllScriptTags(ctx.myClient, "script-shopify")
  ctx.body = res
});

router.post("/", async (ctx) => {
  const res = await createScriptTag(ctx.myClient);
  ctx.body = res;
});

router.put("/", async (ctx) => {
  const scriptTagId = ctx.query.id
  const intensity = ctx.query.intensity
  const imageDistance = ctx.query.imageDistance
  const imageAngle = ctx.query.imageAngle
  const isBackground = ctx.query.isBackground
  const color1 = ctx.query.color1
  const color2 = ctx.query.color2
  const isMobileEnabled = ctx.query.isMobileEnabled
  const isSpecific = ctx.query.isSpecific
  const productsPickedId = ctx.query.productsPickedId
  let res

  const getThemeRes = await getTheme(ctx.axios)
  if(getThemeRes.success){
    const themeStoreId = getThemeRes.body.theme_store_id
    const src = `https://script-shopify.loca.lt/?intensity=${intensity}&imageDistance=${imageDistance}&imageAngle=${imageAngle}&isBackground=${isBackground}&color1=${color1}&color2=${color2}&isMobileEnabled=${isMobileEnabled}&themeStoreId=${themeStoreId}&isSpecific=${isSpecific}&productsPickedId=${productsPickedId}`
    res = await updateScriptTag(ctx.axios, scriptTagId, src);
  } else {
    res = getThemeRes
  } 
  ctx.body = res
});

router.delete("/", async (ctx) => {
  const scriptTagId = ctx.query.id
  const res = await deleteScriptTag(ctx.myClient, scriptTagId)
  ctx.body = res;
});

export default router;
