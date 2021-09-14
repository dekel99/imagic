import React, { useEffect, useState } from 'react'
import styles from "../styles/Result.module.css"
import Effect from "../components/Effect.js"
import Adjustments from './Adjustments'
import ImagePicker from './ImagePicker'

function Result() {
  const [pickedImage, setPickedImage] = useState()
  const image = pickedImage ? pickedImage : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png"

  function updatePickedImage(image){
    setPickedImage(image)
  }
  
  useEffect(() => {
    Effect()
  }, []);
  
  return (
      <div>
        <div className={styles.resultContainer}>
          <Adjustments />
          <div id="effect-container-id" className={styles.container}>
            <div id="card-id" className={styles.card}>
              <div id="product-id" className={styles.product}>
                <div id="circle-id" className={styles.circle}></div>
                <img id="product-img-id" src={image} alt="product img"/>
              </div>
            </div>
          <div style={{marginTop:"20px"}}><ImagePicker updatePickedImage={updatePickedImage}/></div>
          </div>
        </div>
      </div>
  )
}

export default Result