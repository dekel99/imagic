export async function getTheme(axios){
    try {
        const res = await axios.get("/themes.json")
        if (!res) return
        console.log("Themes found:", res.data)
        const mainTheme = res.data.themes.find(theme => theme.role === "main")
        if (!mainTheme){
            console.log("No main theme found")
            return 
        }
        console.log("The main theme is:", mainTheme)
        return {success: true, body: mainTheme}
    } catch(err){
        return {success: false, body: err.message}
    }
}