import React from 'react'
import "./Cart.css"

export const Cart = ({cartItems, handleAddProduct, handleRemoveProduct}) => {

    // Function to format the price with 2 decimal places
    const formatPrice = (price) => {
    return price.toFixed(2);
  };


   //function to calculate the total
    const  totalPrice =cartItems.reduce(
        (price, item) => price + item.quantity * item.price, 
        0
        );

        // Format totalPrice to show only two decimal places
  const formattedTotalPrice = formatPrice(totalPrice);

  return (
    <div className='cart-items'>
        <div className='cart-items-header'>
            Cart Items
        </div>
        {cartItems.length ===0 && (
            <div className='cart-items-empty'> 
                No items are added
            </div>
            )}
            <div>
                {cartItems.map((item) => (
                    <div key={item.id} className='cart-items-list'>
                        <img  
                            className='cart-items-image'
                            src ={item.image}
                            alt ={item.name}
                        />
                    <div className='cart-items-name'>
                            {item.productName}
                    </div>
                    <div className='cart-items-function'>
                        <button 
                            className='cart-items-add' 
                            onClick ={()=> handleAddProduct (item)}
                            > 
                            + 
                        </button>
                        <button 
                            className='cart-items-remove'
                            onClick ={()=> handleRemoveProduct (item)}
                            > 
                            - 
                        </button>
                        <div className='cart-items-price'>
                            {item.quantity} * ${item.price.toFixed(2)}
 
                        </div>

                    </div>    
                    </div>
                ))               
                }
            </div>
            <div className='total-price-title'>
                Total Price
                <div className='total-price'>
                    ${formattedTotalPrice}
                </div>

            </div>

    
    </div>
  )
}

export default Cart;