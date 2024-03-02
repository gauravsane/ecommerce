import React, { createContext, useEffect, useState } from 'react';
import "./Css/LoginSignup.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const LoginSignup = () => {
  const navigate = useNavigate();
  const [username, setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  useEffect(()=>{
    const token = localStorage.getItem('user');
    if(token){
      navigate('/register')
    }
  },[])

  const Navigate = () =>{
    navigate('/')
  }

  // async function submit(e){
  //   e.preventDefault();

  //   try{
  //       const data = await axios.post("http://localhost:3200/register",{
  //           username,email,password
  //       })
  //       if(data){
  //         alert('User register Successfully')
  //         navigate("/")
  //       }
  //       // .then(()=>{
  //       //     if(data == "exist"){
  //       //         alert("User already exists")
  //       //     }
  //       //     else if(data=="not exist"){
  //       //         navigate("/login")
  //       //     }
  //       // })
  //       // .catch(e=>{
  //       //     alert("wrong details")
  //       //     console.log(e);
  //       // })
  //   }
  //   catch(err){
  //       console.log(err);
  //   }}

  const collectData = async() =>{
    // console.log(username,email,password);
    let result = await fetch("http://localhost:3200/register", {
      method: 'post',
      body: JSON.stringify({username, email, password}),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    result = await result.json();
    // console.log(result);
    localStorage.setItem("user",JSON.stringify(result));
    localStorage.setItem('token',JSON.stringify(result.token));

    navigate('/login')
  }



  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>Sign Up</h1>
        <div className="loginsignup-fields">
          <input type="text" placeholder='Enter your name' onChange={(e) => { setName(e.target.value) }}/>
          <input type="text" placeholder='Enter your Email address' onChange={(e) => { setEmail(e.target.value) }}/>
          <input type="password" placeholder='Enter password' onChange={(e) => { setPassword(e.target.value) }}/>
        </div>
        <button type='submit' onClick={collectData}>Sign Up</button>
        <p className='loginsignup-login'>Already have an account? <span onClick={Navigate}>Login here</span></p>
        <div className='loginsignup-agree'> 
        {/* <input type="checkbox" name='' id=''/>
        <p>By continuing, i agree to the terms of use & privacy policy</p> */}
        </div>
      </div>
    </div>
  )
}

export default LoginSignup
