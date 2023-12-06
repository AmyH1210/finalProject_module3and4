//signup page


import React, { useState } from 'react';
import "./Signup.css"
import { Link } from 'react-router-dom';
import axios from 'axios';

export const Signup = () => {
  const [values, setValues] = useState({
          email: "",
          password: "",

      })

      const handleSubmit = (event) => {
        event.preventDefault();
        // React code
        axios.post('http://localhost:5000/signup', values)
          .then(res => console.log(res.data))
          .catch(err => console.error(err));
      };




  return (
        <div className='signUpCard'>
            <h1 className='title'>Sign Up</h1>
            <form onSubmit={handleSubmit}>
              
                
                <div className='inputBoxes'>
                  <label>Email </label>
                  <input 
                    type="email" placeholder="Enter Email" name='email'
                    onChange ={e => setValues({...values, email:e.target.value})} className='form-control'
                  />
                  <label>Password </label>
                  <input type="password" placeholder="Enter Password" name='email'
                    onChange ={e => setValues({...values, password:e.target.value})} className='form-control'

                    />
                </div>
                <div className="buttonCtnr">
                  <button type='submit'>SIGNUP</button>
                  <button>
                    <Link to="/login" type= "login" className='login-link'>LOGIN</Link>
                  </button>
                </div>
            </form>
        </div>
    );
  };

 
export default Signup;