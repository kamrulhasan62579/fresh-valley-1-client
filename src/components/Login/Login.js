import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { initializeApp } from "firebase/app";
import { getAuth, 
         createUserWithEmailAndPassword, 
         signInWithEmailAndPassword, 
         signInWithPopup, 
         GoogleAuthProvider
         } from "firebase/auth";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router-dom";
import GoogleButton from 'react-google-button'
import "./Login.css"


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmqk3DR_-a-YRGR1mZW0a9KJbi7nh2Jk0",
  authDomain: "fresh-valley-1.firebaseapp.com",
  projectId: "fresh-valley-1",
  storageBucket: "fresh-valley-1.appspot.com",
  messagingSenderId: "357075191716",
  appId: "1:357075191716:web:5a1cb51335da3c4cbd2331"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default function Login() {
    let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    console.log(loggedInUser);

  const auth = getAuth();
  const [newUser, setNewUser] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    console.log(data)   
   if(newUser){
    createUserWithEmailAndPassword(auth, data.email, data.password)
    .then((res) => {
        sessionStorage.setItem('token', res.user.accessToken);

        const user = {...loggedInUser};
        user.email = data.email;
        user.displayName = data.displayName;
        user.signUpDate = new Date().toDateString();
        setLoggedInUser(user);
        history.replace(from);
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
    })
    }
    if(!newUser){
        signInWithEmailAndPassword(auth, data.email, data.password)
        .then((res) => {
          sessionStorage.setItem('token', res.user.accessToken);
          const user = {...loggedInUser};
            user.email = data.email;
            user.displayName = res.user.displayName;
            setLoggedInUser(user);
                history.replace(from);
            
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
        }
  };


// google authentication
const provider = new GoogleAuthProvider();
const handleGoogleSignIn = () => {
  signInWithPopup(auth, provider)
  .then((res) => {
    const user = {...loggedInUser};
    user.email = res.user.email;
    user.displayName = res.user.displayName;
    sessionStorage.setItem('token', res.user.stsTokenManager.accessToken)
    setLoggedInUser(user);
    history.replace(from);
    
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
    console.log(errorCode, errorMessage, email, credential);
  });
} 

  return (
  <div className="login-bg w-100 pt-5">
    <h5 className="text-center">Get Ready</h5>
        {
        newUser ? <form className="row m-0 w-100 d-flex justify-content-center" onSubmit={handleSubmit(onSubmit)}>
        <div className="newUserForm col-11 col-sm-8 col-md-6 col-lg-5 col-xl-5 col-xxl-5">
            <input className="input form-control" type="text" placeholder="Full Name" {...register("displayName", {required: true, maxLength: 8})} /> 
            <br/>{errors.displayName && errors.displayName.type === "required" && <span className="error">First name is required</span>}
            {errors.displayName && errors.displayName.type === "maxLength" && <span className="error">Max length exceeded</span> }
            
            <input className="input form-control" type="text" placeholder="Email" {...register("email", {required: true, pattern: /\S+@\S+\.\S+/})} />    
            <br/>{errors.email && errors.email.type === "required" && <span className="error">Email is required</span>}
            {errors.email && errors.email.type === "pattern" && <span className="error">You should insert email like this format /\S+@\S+\.\S+/ pattern</span> }
            
            <input className="input form-control" type="tel" placeholder="Mobile number" {...register("number", {required: true, minLength: 6, maxLength: 12})} />   
            <br/> {errors.number && errors.number.type === "required" && <span className="error">Mobile number is required</span>}
            {errors.number && errors.number.type === "maxLength" && <span className="error">Max length exceeded</span> }
           
            <input className="input form-control" type="password" placeholder="Password" {...register("password", {required: true, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/, minLength: 8, maxLength: 30})} />
            <br/> {errors.password && errors.password.type === "required" && <span className="error">Password is required</span>}
            {errors.password && errors.password.type === "pattern" && <span className="error">Password must have min 1 uppercase letter,  <br/> min 1 lowercase letter, min 1 <br/> special character, min 1 number, min <br/> 8 characters, max 30 characters.</span> }
          
            <input className="form-control btn btn-success" value="Submit" type="submit" />
        </div>
    </form>
    : 
    <form className="row m-0 w-100 d-flex justify-content-center" onSubmit={handleSubmit(onSubmit)}>
        <div  className="newUserForm col-11 col-sm-8 col-md-6 col-lg-5 col-xl-5 col-xxl-5">
            <input className="input form-control" type="text" placeholder="Email" {...register("email", {required: true})} />    
            <br/>{errors.email && errors.email.type === "required" && <span className="error">Email is required</span>}

            <input className="input form-control" type="password" placeholder="Password" {...register("password", {required: true})} />
            <br/> {errors.password && errors.password.type === "required" && <span className="error">Password is required</span>}
            
            <input className="form-control btn btn-success" value="Submit" type="submit" />
        </div>
    </form>
    } 
    <br/>
  <div className="d-flex justify-content-center">
      {
    newUser ? <p >Already have an account? <span  style={{color: 'blue'}} onClick={() => setNewUser(!newUser)}>Log In</span></p> : 
    <p>Are you a new user? <span style={{color: 'blue'}} onClick={() => setNewUser(!newUser)}>Sign Up</span></p>
    }
  </div>

    <br/><br/>
    <div className="d-flex justify-content-center">
          <GoogleButton onClick={handleGoogleSignIn}/>
    </div>
  </div>
  );
}