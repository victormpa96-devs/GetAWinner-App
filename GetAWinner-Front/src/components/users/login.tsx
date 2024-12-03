import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import store from "../../app/store";
import { thunkLoginUser } from "../../app/thunk";
import CButton from "../formElements/button";
import InputText from "../formElements/inputText";
import LogoBanner from "../logoBanner";


interface ILoginProps {}

const Login: FC<ILoginProps> = () => {

    const navigate = useNavigate();

    const [errorMsg, setErrorMsg] = useState("");
    const [showError, setShowError] = useState(false);

    const initialStateLogin = {
        valueLoginUsername: "",
        valueLoginPassword: ""
    }
    
    const [{valueLoginUsername, valueLoginPassword}, setLoginStates] = useState(initialStateLogin);

    const login = async () => {
        const loginData = {
            "username": valueLoginUsername,
            "password": valueLoginPassword
        }

        const loginUser: any = await store.dispatch(thunkLoginUser(loginData)); 

        if(loginUser.status === 200){
            setErrorMsg("");
            setShowError(false);
            navigate("/competitors");
            localStorage.setItem("usernameValue", valueLoginUsername);         
        }

        if(
            (loginUser.response !== undefined && loginUser.response.status === 400) ||
            (loginUser.response !== undefined && loginUser.response.status === 401)
        ){
            setErrorMsg("Incorrect username or password. Try it again!");
            setShowError(true);
        }
                 
    }

    return (
        <React.Fragment>
            <section id="loginBody">
                <LogoBanner />
                <div id="loginContent">            
                    <InputText 
                        label={"Username"} 
                        idInput={"inputtextusernamelogin"} 
                        type={"text"} 
                        placeholder={"insert your username"} 
                        value={valueLoginUsername} 
                        onChange={(text: string) => {setLoginStates({valueLoginUsername: text, valueLoginPassword})}}
                        variant="outline-primary"
                    />
                    <InputText 
                        label={"Password"} 
                        idInput={"inputtextpasswordlogin"} 
                        type={"password"} 
                        placeholder={"insert your password"}
                        value={valueLoginPassword} 
                        onChange={(text: string) => {setLoginStates({valueLoginUsername, valueLoginPassword: text})}}
                        variant="outline-primary"
                    />
                    {showError === true ? <section className="errorMsgContainer"><div>{errorMsg}</div></section> : null}
                    <CButton BVariant="success" text="Login" onClick={login} />
                    <hr />
                    <Link to="/register">Create a new account</Link>
                </div>
            </section>
           
            
        </React.Fragment>
    )
    
}

export default Login;
