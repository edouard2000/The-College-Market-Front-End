import React from "react";
import { useState } from "react";
import * as userActions from '../actions/useractions'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { SignIn } from "../actions/useractions";
import './authentication/login.css'
import googleIcon from '../images/googleIcon.png'
import { Link } from "react-router-dom";
import SingUp from '../components/craeteAccount'
import { useEffect } from "react";

const SignUp = (props) =>{

    const [Email, setEmail ] = useState('');
    const [Password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [login, setLogin] = useState(true);

    const setMail = (event) =>{
        setEmail(event.target.value);
        console.log(Email);
    }
 
    const setpassWord = (event)=>{
        setPassword(event.target.value);
    }

    const dispatchLogin = SignIn(Email, Password);

    const loginRender = ()=>{
        return(
            <div>
                <div className="inputs">
                    <h2>Log In</h2>
                    <input type="text" name="" id="" onChange={setMail} placeholder = 'Login with your email'/>
                    <input type="text" name="" id="" onChange={setpassWord} placeholder = 'Your password'/>
                    <div className="buttons">
                        <input type="button" className="buttonLogin" name="" id="" onClick={()=>{dispatchLogin(dispatch, navigate)}} value ="Sign in"/>
                    </div>
                </div>
            </div>
        )
    }


    return(
        <div className="loginPage">
            <div className="loginCard">
                <h1 className="heading">The Dartmouth market</h1>
                <div className="lognavigator">
                    <Link className="loginLink" onClick={()=>{setLogin(true)}}>Login</Link>
                    <Link className="loginLink" onClick={()=>{setLogin(false)}}>Create account</Link>
                </div>
                {(login)? loginRender(): <SingUp />}
                <hr />
                <div className="bottoms">
                    <div className="third-party-login">
                        <img src={googleIcon} alt="" height='70rem' width='70rem'/>
                        <input type="button" name="" id=""  value = {`${(login)? 'Login ' : 'Sign up'} with Google`}/>
                    </div>
                    <div className="links">
                        <Link >Privacy</Link>
                        <Link>Legal</Link>
                        <Link>Need help?</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp;