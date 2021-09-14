export function saveInitialValues(intensity,imageDistance,imageAngle,isMobileEnabled,isBackground,color1,color2,isSpecific,productsPickedId,productsPicked) {
    localStorage.setItem("intensity", `${intensity}`)
    localStorage.setItem("imageDistance", `${imageDistance}`)
    localStorage.setItem("imageAngle", `${imageAngle}`)
    localStorage.setItem("isMobileEnabled", `${isMobileEnabled}`)
    localStorage.setItem("isBackground", `${isBackground}`)
    localStorage.setItem("color1", `${color1}`)
    localStorage.setItem("color2", `${color2}`)
    localStorage.setItem("isSpecific", `${isSpecific}`)
    localStorage.setItem("productsPickedId", JSON.stringify(productsPickedId))
    localStorage.setItem("productsPicked", JSON.stringify(productsPicked))
}