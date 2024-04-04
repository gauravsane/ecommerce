import React, { useState } from "react";
import "./Css/LoginSignup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [username, setName] = useState("");
  const [password, setPassword] = useState("");
  // const [token, setToken] = useState('');

  // async function submit(e){
  //   e.preventDefault();

  //   try{
  //       await axios.post("http://localhost:3200/login",{
  //           username,password
  //       })
  //       .then((data)=>{
  //           if(data=="exist"){
  //               navigate("/shop")
  //           }
  //           else if(data=="not exist"){
  //               alert("User have not sign up")
  //           }
  //       })
  //       .catch(e=>{
  //           alert("wrong details")
  //           console.log(e);
  //       })
  //   }
  //   catch(e){
  //       console.log(e);

  //   }}

  const Navigate = () => {
    navigate("/register");
  };

  // const handleLogin = async() =>{
  //   let result = await fetch("http://localhost:3200/login", {
  //     method: 'post',
  //     body: JSON.stringify({ username, password}),
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   });

  //   result = await result.json()
  //   console.log(result);
  //   if(result.token){
  //     localStorage.setItem('user',JSON.stringify(result.data));
  //     localStorage.setItem('token',JSON.stringify(result.token));
  //     navigate('/')
  //   }
  //   else{
  //     alert('please enter correct details')
  //   }
  // }
  const handleLogin = async () => {
    try {
      const { data } = await axios.post("http://localhost:3200/login", {
        username,
        password,
      });
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("token", JSON.stringify(data.token));
     if(data.data.username === 'Admin'){
      // console.log(data.data);
      navigate('/admin')
     }
     else{
      navigate('/')
     }
    // navigate('/')
      alert(data.message);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>Login</h1>
        <div className="loginsignup-fields">
          <input
            type="text"
            placeholder="Enter your name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Enter password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button type="submit" onClick={handleLogin}>
          Login
        </button>
        <button type="submit" onClick={Navigate}>
          SignUp
        </button>
        {/* <p className='loginsignup-login'>Already have an account? <span>Login here</span></p> */}
        <div className="loginsignup-agree">
          {/* <input type="checkbox" name='' id=''/>
        <p>By continuing, i agree to the terms of use & privacy policy</p> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
