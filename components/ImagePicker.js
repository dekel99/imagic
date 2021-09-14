import { ResourcePicker } from '@shopify/app-bridge-react'
import { Button } from '@shopify/polaris'
import React, { useEffect, useState } from 'react'

function ImagePicker({ updatePickedImage }) {
  const [isImgPickerOpen, setIsImgPickerOpen] = useState(false)
  const [imagePicked, setImagePicked] = useState()

  useEffect(() => {
    updatePickedImage(imagePicked)
  }, [imagePicked])

  return (
    <div>
      <Button 
        onClick={() => setIsImgPickerOpen(true)}
      >
        Pick test image
      </Button>
      <ResourcePicker
        resourceType="Product"
        open={isImgPickerOpen}
        onCancel={() => setIsImgPickerOpen(false)}
        onSelection={(productPicked) => {
          setIsImgPickerOpen(false)
          setImagePicked(productPicked.selection[0].images[0].originalSrc)
        }}
      />
    </div>
  )
}

export default ImagePicker
