import { Page, Banner, Heading, Layout, Card } from "@shopify/polaris";
import { useEffect, useState } from "react";
import Install from '../components/Install'
import { useAxios } from "../hooks/useAxios";

function Index(){ 
  const [scriptTag, setScriptTag] = useState()
  const [isThemeSupported, setIsThemeSupported] = useState(true)
  const [axios] = useAxios()
  const appUrl = process.env.NEXT_PUBLIC_APP_URL
  const themesId = {debut: 796, express: 885, dawn: 887}
  const themesSupported = [themesId.dawn, themesId.debut, themesId.express]

  async function fetchScriptTags() {
    const res = await axios.get(appUrl + "/script_tag/all")
    if(res.data.success){
      const script_tags = res.data.body
      if (script_tags.length > 0) setScriptTag(script_tags[0])  
      console.log("script tag get response:", script_tags)
      return
    } 
    console.log("Error while fetched script tags:", res.data)
  }

  async function getMainTheme(){
    const res = await axios.get(appUrl + "/theme/main")
    if(res.data.success){
      const mainTheme = res.data.body
      if(themesSupported.includes(mainTheme.theme_store_id)){
        setIsThemeSupported(true)
      } else {
        setIsThemeSupported(false)
      }
      return mainTheme
    }
    console.log("Error while get main theme:", res.data)
  }

  useEffect(() => {
    fetchScriptTags()
    getMainTheme()
  }, [])

  return(
    <Page title="Imagic - First steps and toggle on/off">
      <Layout>
        <Layout.Section>
          <Card title="Step 1 - Theme support:" sectioned>
            <Banner
              title={isThemeSupported ? "Theme supported" :"Theme is not supported"}
              status={isThemeSupported ? "success" : "warning"}
            >
              {isThemeSupported ?
              <p>The theme is supported, no further step is needed</p>
              :      
              <p>Please inform the developers at luskiteam@gmail.com and support to your theme will be added ASAP</p>}
            </Banner>
          </Card>
        </Layout.Section>
        <Layout.Section>
          <Card title="Step 2 - Enable app:" sectioned>
            <Install scriptTag={scriptTag} />
          </Card>
        </Layout.Section>
        <Layout.Section>
          <Card title="Step 3 - Customize:" sectioned>
            <p>Customize the image by clicking on customize tab above</p>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  )
}

export default Index;
