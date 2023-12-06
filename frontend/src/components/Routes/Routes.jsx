//Routing to control Home page, Signup page and Cart page
import React from 'react'
import {Route, Routes } from "react-router-dom";
import Products from "../Products/Products";
// Import statement in the file where you use Signup
import Signup from "../Signup/Signup";
import Login from '../Login/Login';
import Cart from "../Cart/Cart"


export const MyRoutes = ({productItems, cartItems, handleAddProduct,handleRemoveProduct}) => {
  return (
    <div>
         <Routes>
            
            <Route path="/" 
                element={<Products 
                productItems={productItems}
                handleAddProduct ={handleAddProduct}
             />} />
            <Route path="/signup" element={<Signup />} />
            <Route path = '/login' element ={< Login />}/>
            <Route path="/cart" 
                element={<Cart  
                cartItems={cartItems}
                handleAddProduct ={handleAddProduct}  
                handleRemoveProduct={handleRemoveProduct}
                />} />  
        </Routes>
    </div>
  )
}

export default MyRoutes;



