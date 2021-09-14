import React, { useCallback, useEffect, useState } from 'react'
import { ResourcePicker } from '@shopify/app-bridge-react'
import { Button, Toast } from '@shopify/polaris'

function ProductsToApply({ handleProductsChange }) {
  const [isPickerOpen, setIsPickerOpen] = useState(false)
  const [productsId, setProductsId] = useState()
  const [products, setProducts] = useState()
  const [isProductsPickedErr, setIsProductsPickedErr] = useState(false)

  const toggleProductsPickedErr = useCallback(() => setIsProductsPickedErr((active) => !active), []);

  useEffect(() => {
    handleProductsChange(productsId, products)
  }, [productsId,products])
  
  return (
    <div>
      <Button 
        onClick={() => setIsPickerOpen(true)}
      >
        Pick Products
      </Button>
      <ResourcePicker
        resourceType="Product"
        open={isPickerOpen}
        onCancel={() => setIsPickerOpen(false)}
        onSelection={(productsPicked) => {
          setIsPickerOpen(false)
          if(productsPicked.selection.length <= 3){
            const productsResId = productsPicked.selection.map(product => {return product.id.substring(22)})
            setProducts(productsPicked.selection)
            setProductsId(productsResId)
          } else {
            toggleProductsPickedErr()
          }
        }}
      /> 
      {isProductsPickedErr && 
        <Toast content="Product limit passed" error onDismiss={toggleProductsPickedErr} />}
    </div>
  )
}

export default ProductsToApply
