import React, { useContext, useEffect, useState } from 'react'
import styles from "../styles/Adjustments.module.css"
import Effect from "../components/Effect.js"
import { Banner, Button, TextContainer } from "@shopify/polaris";
import { useAxios } from "../hooks/useAxios";
import { ScriptTagContext } from '../pages/customize';
import Portal from "./Portal"
import { getInitialValues } from "../functions/getInitialValues"
import { saveInitialValues} from "../functions/saveInitialValues"
import ProductsToApply from "./ProductsToApply"

function Adjustments() {
    const [initialValues, setInitialValues] = useState(getInitialValues())
    const scriptTag = useContext(ScriptTagContext)
    const [axios] = useAxios()
    const [isSaveBtnLoading, setIsSaveBtnLoading] = useState(false)
    const [saveResponse, setSaveResponse] = useState(false)
    const [intensity, setInstensity] = useState(initialValues?.intensity)
    const [imageDistance, setImageDistance] = useState(initialValues?.imageDistance)
    const [imageAngle, setImageAngle] = useState(initialValues?.imageAngle)
    const [isMobileEnabled, setIsMobileEnabled] = useState(initialValues?.isMobileEnabled)
    const [isBackground, setIsBackground] = useState(initialValues?.isBackground)
    const [color1, setColor1] = useState(initialValues?.color1)
    const [color2, setColor2] = useState(initialValues?.color2)
    const [isSpecific, setIsSpecific] = useState(initialValues?.isSpecific)
    const [productsPickedId, setProductsPickedId] = useState(initialValues?.productsPickedId)
    const [productsPicked, setProductsPicked] = useState(initialValues?.productsPicked)
    const appUrl = process.env.NEXT_PUBLIC_APP_URL

    function handleIntensityChange(e){
        setInstensity(parseInt(e.target.value))
    }
    function handleImageDistanceChange(e){
        setImageDistance(parseInt(e.target.value))
    }
    function handleImageAngleChange(e){
        setImageAngle(parseInt(e.target.value))
    }
    function handleMobileEnableToggle(e) {
        setIsMobileEnabled(!isMobileEnabled)
    }
    function handleBackgroundToggle(e){
        setIsBackground(!isBackground)
    }
    function handleColorChange1(e){
        setColor1(e.target.value.substring(1)) // Updates HEX color without "#"
    }
    function handleColorChange2(e){
        setColor2(e.target.value.substring(1))
    }
    function handleSpecificToggle(e) {
        setIsSpecific(!isSpecific)
    }
    function handleProductsChange(productsId, products){
        if(productsId) setProductsPickedId(productsId)
        if(products) setProductsPicked(products)
    }
    
    async function handleUpdate(){
        const src = `${appUrl}/script_tag/?id=${scriptTag.id}&intensity=${intensity}&imageDistance=${imageDistance}&imageAngle=${imageAngle}&isBackground=${isBackground}&color1=${color1}&color2=${color2}&isMobileEnabled=${isMobileEnabled}&isSpecific=${isSpecific}&productsPickedId=${productsPickedId}`
        if (scriptTag){
            setIsSaveBtnLoading(true)
            const res = await axios.put(src)
            if(res.data.success){
                // saveInitialValues(intensity,imageDistance,imageAngle,isMobileEnabled,isBackground,color1,color2,isSpecific,productsPickedId,productsPicked)
                setSaveResponse("ok")
            } else {
                setSaveResponse("error")
            }
            setIsSaveBtnLoading(false)
            console.log(res.data)
        }
    }

    useEffect(() => {
        Effect(intensity,imageDistance,imageAngle,isBackground,`#${color1}`,`#${color2}`)
    }, [intensity,imageDistance,imageAngle,isBackground,color1,color2])
    
    return (
        <div className={styles.container}>
            <div className={styles.sliderItem}>
                <TextContainer spacing="tight">
                    <p>Effect intensity</p>
                    <input type="range" min="0" max="100" value={intensity} onChange={handleIntensityChange}/>
                </TextContainer>
            </div>
            <hr className={styles.lineSeperation}/>
            <div className={styles.sliderItem}>
                <TextContainer spacing="tight">
                    <p>Image distance forward</p>
                    <input type="range" min="0" max="200" value={imageDistance} onChange={handleImageDistanceChange}/>
                </TextContainer>
            </div>
            <hr className={styles.lineSeperation}/>
            <div className={styles.sliderItem}>
                <TextContainer spacing="tight">
                    <p>Image spin</p>
                    <input style={{marginBottom: "10px"}} type="range" min="-180" max="180" value={imageAngle} onChange={handleImageAngleChange}/>
                    <input style={{display: "block", margin: "auto"}} type="number" value={imageAngle} min="-180" max="180" onChange={handleImageAngleChange}/>
                </TextContainer>
            </div>
            <hr className={styles.lineSeperation}/>
            <div className={styles.sliderItem}>
                <TextContainer spacing="tight">
                    <label htmlFor="background-id">Background</label>
                    <input type="checkbox" checked={isBackground} id="background-id" onChange={handleBackgroundToggle} />
                    {isBackground && 
                        <div>
                            <input value={`#${color1}`} onChange={handleColorChange1} className={styles.colorPicker} type="color"/>
                            <input value={`#${color2}`} onChange={handleColorChange2} className={styles.colorPicker} type="color"/>
                        </div>}
                </TextContainer>
            </div>
            <hr className={styles.lineSeperation}/>
            <div className={styles.sliderItem}>
                <TextContainer spacing="tight">
                    <label htmlFor="is-mobile-id">Enable on mobile (movement based)</label>
                    <input id="is-mobile-id" type="checkbox" checked={isMobileEnabled} onChange={handleMobileEnableToggle} />
                </TextContainer>
            </div>
            <hr className={styles.lineSeperation}/>
            <div className={styles.sliderItem}>
                <TextContainer spacing="tight">
                    <label htmlFor="specific-id">Apply only to specific products (up to 3)</label>
                    <input type="checkbox" checked={isSpecific} id="specific-id" onChange={handleSpecificToggle} />
                    {isSpecific && 
                        <div>
                            <ProductsToApply handleProductsChange={handleProductsChange}/>
                            {productsPicked && 
                                <div className={styles.productsWinContainer}>   
                                    {productsPicked.map((product,i) => {
                                        return <p key={i}>{product.title}</p>
                                    })}
                                </div>}
                        </div>}
                </TextContainer>
            </div>
            <hr className={styles.lineSeperation}/>
            <div className={styles.saveBtn}>
                <Button
                    primary
                    disabled={!scriptTag}
                    loading={scriptTag ? isSaveBtnLoading : false}
                    onClick={handleUpdate}
                >
                    Save
                </Button>
            </div>
            {saveResponse && 
                <Portal portalId="saveResult"> 
                    <div className={styles.saveResult}>
                        <Banner
                            title={saveResponse==="ok" ? "Saved successfully" : "Save failed, please try again"}
                            status={saveResponse==="ok" ? "success" : "critical"}
                        />
                    </div>
                </Portal>}
        </div>
    )
}

export default Adjustments
