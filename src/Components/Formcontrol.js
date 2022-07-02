import React, { useState,useEffect } from "react";
import PropTypes from 'prop-types'

const Formcontrol = ({handleData,btnText,selectedUser}) => {

    const [user,setUser]= useState({
        username:" ",
        email:" ",
    });

   useEffect(() => {
     setUser({
      username: selectedUser.username,
      email:selectedUser.email,
     })
   
     
   }, [selectedUser])
   
    
    const {username,email}=user;

    const handleChange=(e)=>{
        const selectedFieldname=e.target.name;
        const selectedFieldValue= e.target.value;

        setUser((prevState)=>{
            return {...prevState,[selectedFieldname]:selectedFieldValue}
        });
      

    }

    const handleSubmit= (e)=>{
        e.preventDefault();
        handleData(user);

        setUser({
            username:"",
            email:"",
        })
    }
  return (
    <>
    
    <form onSubmit={handleSubmit}>
      <div className="input__field">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Enter Username"
          required
          value={username}
          onChange={handleChange}
        />
      </div>
      <div className="input__field">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter Email"
          required
          value={email}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn">{btnText}</button>
    </form>
    
    </>
  );
};

Formcontrol.defaultProps={
  selectedUser:{
    username:'',
    email:''
  }

}

export default Formcontrol;
