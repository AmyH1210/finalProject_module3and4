import React from 'react'
import "./Login.css";
import { Link } from 'react-router-dom';

export const Login = () => {
  return (
        <div className="logInCard">
            <h1 className='title'>Log In</h1>
            <form>
                
                <div className="inputBoxes">
                    <label>Email </label>
                    <input type="text"  placeholder="Enter Email"  name="name" required />
                
                </div>
                <div className="inputBoxes">
                    <label>Password </label>
                    <input type="password" placeholder="Password" name="pass" required />
                
                </div>
                <div className="button">
                    <button type="submit" >LOGIN</button>
                    <button>
                        <Link to="/signup" className ="login-link" >SIGNUP</Link>
                    </button>
                </div>
            </form>
            </div>
        );
}

export default Login;