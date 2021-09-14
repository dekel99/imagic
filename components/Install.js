import { Button, TextStyle } from "@shopify/polaris";
import React, { useEffect, useState } from "react";
import { useAxios } from "../hooks/useAxios";

let isAppEnabled

function Install({ scriptTag }) {
  if (typeof window !== 'undefined') isAppEnabled = false//JSON.parse(localStorage.getItem("isAppEnabled"))
  const [axios] = useAxios();
  const [isInstall, setIsInstall] = useState(isAppEnabled)
  const [scriptTagId, setScriptTagId] = useState()
  const [installBtnEnabled, setInstallBtnEnabled] = useState(false)
  const appUrl = process.env.NEXT_PUBLIC_APP_URL

  async function handleInstall() {
    setInstallBtnEnabled(false)
    const res = await axios.post(appUrl + "/script_tag")
    if(res.data.success){
      const {script_tag} = res.data.body;
      setIsInstall(true)
      setScriptTagId(script_tag.id)
      // localStorage.setItem("isAppEnabled", true)
    }
    setInstallBtnEnabled(true)
    console.log("script tag post response:", res.data)
  }
 
  async function handleUninstall(){
    setInstallBtnEnabled(false)
    const res = await axios.delete(`${appUrl}/script_tag/?id=${scriptTagId}`)
    if(res.data.success){ 
      setIsInstall(false)
      // localStorage.setItem("isAppEnabled", false)
    }
    setInstallBtnEnabled(true)
    console.log("script tag delete response:", res.data)
  }

  useEffect(() => {
    if(scriptTag){
      setScriptTagId(scriptTag.id)
      setIsInstall(true)
      console.log("log from install", scriptTag)
    } else {
      setIsInstall(false)
    }
    setInstallBtnEnabled(true)
  }, [scriptTag])

  return (
    <div style={{ display: "block" }}>
      the special product image is
      <TextStyle variation="strong">
        {isInstall ? " enable " : " disabled "}
      </TextStyle>
      <Button 
        primary={true} 
        loading={!installBtnEnabled} 
        onClick={isInstall ? handleUninstall : handleInstall}
      >
        {isInstall ? "Disable" : "Enable"}
      </Button>
    </div>
  );
}

export default Install;
