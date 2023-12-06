import React, {useState} from 'react';
import data from "./asset/Data.js"
import './App.css';
import Header from "./components/Header/Header.jsx"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyRoutes from "./components/Routes/Routes.jsx"
import Cart from "./components/Cart/Cart.jsx"
import Login from './components/Login/Login.jsx';
import Signup from "./components/Signup/Signup.jsx"

function App() {

  const {productItems} = data;

  //will be used to keep track of the items in the shopping cart, 
  //and setCartItems is used to update the state.
  const [cartItems, setCartItems]=useState([]);

  //A function that check if the product is already in the cart (productExist). 
  //If it exists, incrementing the quantity of that product in the cart
  //If not, adding the product to the cart with a quantity of 1.
  const handleAddProduct = (product) =>{
    const productExist = cartItems.find((item) => item.id ===product.id);
    if (productExist) {
      setCartItems(cartItems.map((item) => item.id === product.id ?
      {...productExist, quantity: productExist.quantity + 1}: item)
      );
      }else {
        setCartItems([...cartItems, {...product, quantity: 1}])
       }        
    }

    //a function that takes a product as an argument. 
    //checking if the product is already in the cart (productExist) 
    // If the quantity is 1, removing the product from the cart 
    //If the quantity > 1, decrementing the quantity of that product in the cart.
    const handleRemoveProduct = (product) =>{
      const productExist = cartItems.find((item) => item.id ===product.id);
      if(productExist.quantity ===1){
          setCartItems(cartItems.filter((item) => item.id !== product.id));
      } else{
        setCartItems(
          cartItems.map((item )=> item.id ===product.id ? {...productExist, quantity: productExist.quantity -1}: 
          item
          ) 
          )
        
      }
    }
  

  return (
    <div className="App">
        <Router>
            <Header cartItems={cartItems}/>
            <Routes >
              <Route path="/" 
                    element={<MyRoutes 
                    productItems={productItems}
                    handleAddProduct ={handleAddProduct}
                     />} />
              <Route path="/signup" element={<Signup />} />
              <Route path = '/login' element ={<Login />}/>
              <Route path="/cart" 
                    element={<Cart 
                    cartItems={cartItems}
                     handleAddProduct ={handleAddProduct}
                     handleRemoveProduct={handleRemoveProduct}
                    />} /> 
            </Routes>
        </Router>
    </div>
  );
}

export default App;
