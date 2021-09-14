import Axios from "axios";
import fs from "fs"
import path from "path";

const themeApi = "/admin/api/2021-01"
const themesId = {debut: 796, express: 885, dawn: 887}

export async function updateTheme(shop, accessToken){
    const axios = Axios.create({
        baseURL: `https://${shop}${themeApi}`,
        headers: {
            "Content-Type": "application/json",
            "X-Shopify-Access-Token": accessToken
        }
    })
    const mainTheme = await getTheme(axios) 
    if (!mainTheme.id) return
    const newPage = await getAssetThemeLiquid(mainTheme, axios)
    if (!newPage) return
    await uploadAssetTheme(axios, mainTheme.id, newPage, productSnippetPath(mainTheme))
    const newSnippet = getFile("../../liquid/imagic.liquid") 
    await uploadAssetTheme(axios, mainTheme.id, newSnippet.toString(), "snippets/imagic.liquid")
}

function getFile(fileName){
    return fs.readFileSync(path.resolve(__dirname, fileName))
}

// Uploads assets for updating existing or create new files or pages
async function uploadAssetTheme(axios, mainThemeId, page, pageName){
    const body = {
        asset : {
            key: pageName,
            value: page
        } 
    }
    const result = await axios.put(`/themes/${mainThemeId}/assets.json`,body).catch(err => console.log("update theme error",err.message))

    if (!result) return
}

// Returns page after updating it with my snippet
async function getAssetThemeLiquid(mainTheme, axios){
    const productPath = productSnippetPath(mainTheme)
    const res = await axios.get(`/themes/${mainTheme.id}/assets.json?asset[key]=${productPath}`)
    if (!res.data.asset.value) return
    const snippet = getFile("../../liquid/product.liquid")  
    let asset = res.data.asset.value
    if(asset.includes(snippet)){
        console.log("Snippet allready installed")
    } else {
        asset = asset.replace(
            asset,
            `${snippet}\n\n${asset}`
        )
    }
    return asset
}

// Get the main theme of the user
async function getTheme(axios){
    const res = await axios.get("/themes.json")
    if (!res) return
    console.log("Themes found:", res.data)
    const mainTheme = res.data.themes.find(theme => theme.role === "main")
    if (!mainTheme){
        console.log("No main theme found")
        return
    }
    console.log("The main theme is:", mainTheme)
    return mainTheme
}

function productSnippetPath(mainTheme){
    if (mainTheme.theme_store_id === themesId.dawn) {
        return "sections/main-product.liquid"
    }
    return "templates/product.liquid"
}