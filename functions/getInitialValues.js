let initialValues

export function getInitialValues() {
    if (typeof window !== 'undefined'){
        if (false && localStorage.getItem("intensity")){
            initialValues = {
                intensity: JSON.parse(localStorage.getItem("intensity")),
                imageDistance: JSON.parse(localStorage.getItem("imageDistance")),
                imageAngle: JSON.parse(localStorage.getItem("imageAngle")),
                isMobileEnabled: JSON.parse(localStorage.getItem("isMobileEnabled")),
                isBackground: JSON.parse(localStorage.getItem("isBackground")),
                color1: localStorage.getItem("color1"),
                color2: localStorage.getItem("color2"),
                isSpecific: JSON.parse(localStorage.getItem("isSpecific")),
                productsPickedId: JSON.parse(localStorage.getItem("productsPickedId")),
                productsPicked: JSON.parse(localStorage.getItem("productsPicked"))
            }
        } else {
            initialValues = {
                intensity: 40,
                imageDistance: 100,
                imageAngle: 50,
                isMobileEnabled: true,
                isBackground: true,
                color1: "f54642bf",
                color2: "08539cbf",
                isSpecific: false,
                productsPickedId: "all",
                productsPicked: null
            }
        }
    } 
    return initialValues
}
