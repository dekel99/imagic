import { DataType } from "@shopify/shopify-api";

export async function createScriptTag(client){
  console.log("test-----------------------------------------------------")
  if (client){
    const data = {
      script_tag: {
        event: "onload",
        src: "https://script-shopify.loca.lt/?default=true"
      }
    }
    // Send request using shopify instead of axios
    try{
      const result = await client.post({
        path: "script_tags",
        data,
        type: DataType.JSON
      })
      const script_tag = result.body
      console.log("response from shopify server script tag:",script_tag)
      return {success: true, body: script_tag}
    } catch(err){
      console.log("create script tags error", err.message)
      return {success: false, body: err.message}
    }
  }
  return
}

export async function updateScriptTag(axios, id, src="https://google.com/"){
  if (axios){
    const body = {
      script_tag: {
        src
      }
    }
    try{
      const res = await axios.put(`/script_tags/${id}.json`,body)
      console.log(res)
      const script_tag = res.data
      console.log("response from shopify server script tag put:",script_tag)
      return {success: true, body: script_tag}
    } catch(err){
      console.log("update script tags error", err.message)
      return {success: false, body: err.message}
    }
  }
}

export async function getAllScriptTags(client, src){
  if (client){
    try{
      const result = await client.get({path: "script_tags"})
      const {script_tags} = result.body
      const filteredScriptTag = script_tags.filter(tag => tag.src.includes(src))
      console.log("response from shopify server script tag:", filteredScriptTag)
      return {success: true, body: filteredScriptTag}
    } catch(err){
      console.log("get all script tags error", err.message)
      return {success: false, body: err.message}
    }
  }
  return
}

export async function deleteScriptTag(client, id){
  if (client){
    try{
      const result = await client.delete({path: `script_tags/${id}`})
      return {success: true, body: result.body}
    } catch(err){
      console.log("delete script tag error", err.message)
      return {success: false, body: err.message}
    }
  }
  return
}

// function getBaseUrl(shop){
//   return `https://${shop}`
// }

// function getAllScriptTagsUrl(shop){
//   return `${getBaseUrl(shop)}/admin/api/2021-01/script_tags.json`
// }

// function getScriptTagUrl(shop,id){
//   return `${getBaseUrl(shop)}/admin/api/2021-01/script_tags/${id}.json`
// }

// function createScriptTagUrl(shop){
//   return `${getBaseUrl(shop)}/admin/api/2021-01/script_tags.json`
// }

// function deleteScriptTagUrl(shop,id){
//   return `${getBaseUrl(shop)}/admin/api/2021-01/script_tags/${id}.json`
// }