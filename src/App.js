import React, { useState, useEffect } from "react";
import "./App.css";
import Formcontrol from "./Components/Formcontrol";

function App() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState();
  const [isLoading, setLoading] = useState(true);

  const getFetch = () => {
    fetch("https://rest-api-without-db.herokuapp.com/users/")
      .then((res) => {
        if (!res.ok) {
          throw Error("Could not found...");
        }
        return res.json();
      })
      .then((data) => {
        setUserData(data.users);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getFetch();
  }, []);

  // delete user
  const handleDelete= (id) =>{
    fetch("https://rest-api-without-db.herokuapp.com/users/" + `/${id}`,{
      method:"DELETE",
    })
    .then((res) =>{
        if (!res.ok){
          throw Error("Could not Delete...");
        }
        getFetch();
    })
    .catch((err) => {
      setError(err.message);
    })
  }

  // Edit user 
const handleEdit = () =>{
  
}

// create data

const addData=(user)=>{
  fetch("https://rest-api-without-db.herokuapp.com/users/",{
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify(user),
  })
  .then((res)=>{
    if(res.status===201){
      getFetch();
    }
    else{
      throw new Error("new user could not create");

    }
  })
  .catch((err)=>{
    setError(err.message);
  })
 
}

  return (
    <div className="App">
      <h1>User Management App...</h1>
      {isLoading && <h2>Server is Loading...</h2>}
      {error && <h2>{error}</h2>}
      <Formcontrol btnText="Add User" handleData={addData}/>
      <div  className="card__div">
      {userData &&
        userData.map((user) => {
          const { id, username, email } = user;
          return (
            
              <div className="card" key={id}>
                <p>Name: {username}</p>
                <p>Email: {email}</p>
                <button className="btn" onClick={()=>{handleEdit(id)}}>Edit</button>
                <button className="btn" onClick={()=>{handleDelete(id)}}>Delete</button>
              </div>
            
          );
        })}
        </div>
    </div>
  );
}

export default App;
