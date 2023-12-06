//responsible for the list of products
import React from 'react'
import "./Products.css"

// takes an object as its argument, and from that object
//destructing productItems and handleAddProduct as props.
export const Products = ({productItems, handleAddProduct} ) => {
  return (
    <div className='products'>

      {productItems.map((productItems) => (

         //uses the map function to iterate over each item in the productItems array.
        // For each item, it creates a  with the class 'card'
            <div className='card'>
                <div>
                    <img 
                      className ="product-image"  
                      src ={productItems.image} 
                      alt ={productItems.productName}   
                      />
                </div>
                <div>
                    <h3 className='product.name'>
                    
                      {productItems.productName}
                    </h3>
                    
                </div>
                <div className='product.price'>
                    <h3>
                      ${productItems.price.toFixed(2)}
                    </h3>
                </div>
                <div >
                    <button  
                        className='addToCart' 
                        onClick={()=> handleAddProduct(productItems)}>
                       <p>Add To Cart</p>
                    </button>
                </div>

            </div>
      )
      )}
    
    </div>
  )
}

export default Products;
