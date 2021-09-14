import combineRouters from "koa-combine-routers";
import scriptTagRouter from "./script_tag"
import themeRouter from "./theme"

const router = combineRouters(scriptTagRouter, themeRouter)

export default router