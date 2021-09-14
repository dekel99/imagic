import Router from "koa-router"
import { getTheme } from "../theme/getTheme"

const router = new Router({ prefix: "/theme" })

router.get("/main", async (ctx) => {
    const mainTheme = await getTheme(ctx.axios)
    ctx.body = mainTheme
})

export default router
