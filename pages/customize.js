import React, { useEffect, useState } from 'react'
import { Frame, Page } from "@shopify/polaris";
import Result from "../components/Result"
import { useAxios } from '../hooks/useAxios'

export const ScriptTagContext = React.createContext()

function customize() {
  const [axios] = useAxios()
  const [scriptTag, setScriptTag] = useState()
  const appUrl = process.env.NEXT_PUBLIC_APP_URL

  async function fetchScriptTags() {
    const res = await axios.get(appUrl + "/script_tag/all")
    if(res.data.success){
      const script_tags = res.data.body
      if (script_tags.length > 0) setScriptTag(script_tags[0])  
      return
    } 
    console.log("Error while fetched script tags:", res.data)
  }
  
  useEffect(() => {
    fetchScriptTags()
  }, []);
  
  return (
    <ScriptTagContext.Provider value={scriptTag}>
      <Frame>
      <Page title="Imagic - Customize">
        <Result />
        <div id="saveResult" /> 
      </Page>
      </Frame>
    </ScriptTagContext.Provider>
  )
}

export default customize
