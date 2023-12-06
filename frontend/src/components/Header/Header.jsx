import React from 'react';
import {Link} from "react-router-dom";
import "./Header.css";
import { ShoppingCart } from  'phosphor-react';

export const Header = ({cartItems}) => {
  return (
    //header
    <header className="header" >
        <div>       
            <h1>
                <Link to="/" className="title">
                MAIKAI JEWERY
                </Link>    
            </h1>           
        </div>
        <div className="header-links">
            <ul>
                
                    <Link to="/">Home</Link>
                
            
                    <Link to="/signup">Signup</Link>
               
            
                
                    <Link to="/cart" className="cart_logo">
                        <ShoppingCart size={32}/>
                        <span className='cart-length'> 
                            {cartItems.length === 0 ? "": cartItems.length}
                        </span>
                    </Link>
                       
              
            </ul>

        </div>
    </header> 
  )
}

export default Header;