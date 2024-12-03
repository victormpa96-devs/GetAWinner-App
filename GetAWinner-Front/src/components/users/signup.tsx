import React, { FC, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import store from "../../app/store";
import { thunkRegisterUser } from "../../app/thunk";
import CButton from "../formElements/button";
import InputText from "../formElements/inputText";
import LogoBanner from "../logoBanner";
import { IUser } from "../main";


interface ISignupProps {}

const Signup: FC<ISignupProps> = () => {

    const navigate = useNavigate();

    const initialStateRegister = {
        valueUsername: "",
        valuePassword: "",
        valueRepeatPassword: ""
    }
    
    const [{valueUsername, valuePassword, valueRepeatPassword}, setRegisterStates] = useState(initialStateRegister);
    const [usernameRepeatedMsg, setUsernameRepeatedMsg] = useState("");
    const [usernameMsg, setUsernameMsg] = useState("");
    const [passwordMsg, setPasswordMsg] = useState("");
    const [repeatPasswordMsg, setRepeatPasswordMsg] = useState("");
    const [showErrors, setShowError] = useState(false);
    let bool = true;

    const veriryRegister = (username: string, password: string, repeatpassword: string) => {
        
        if(username === "" || username.length+1 < 5){
            bool = false;
            setUsernameMsg("Username is less than 5 characters or empty");
        }else{
            setUsernameMsg("");
        }

        const regexp: RegExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/g;

        if(!regexp.test(password)){
            bool = false;
            setPasswordMsg("Password does not meet requirements");
        } else{
            setPasswordMsg("");
        }

        if(password !== repeatpassword){
            bool = false;
            setRepeatPasswordMsg("Passwords do not match");
        } else{
            setRepeatPasswordMsg("");
        }

        return bool;
        
    }

    const senduser = async () => {        

        const dataIsCorrect = veriryRegister(valueUsername, valuePassword, valueRepeatPassword); // true or false -- if true -> register user 
        
        if(dataIsCorrect){
            const User: IUser = {
                username: valueUsername,
                password: valuePassword
            }
            
            const registerUser: any = await store.dispatch(thunkRegisterUser(User));
            
            if(registerUser === "USERNAME ALREADY EXISTS"){
                setShowError(true);
                setUsernameRepeatedMsg("This username already exist, try another.");
            }else{
                setUsernameRepeatedMsg("");
                setShowError(false);
                navigate("/login");
            }            

        }else{
            setShowError(true);
        }
        
    }


    return (
        <React.Fragment>
            <section id="registerBody">
                <LogoBanner />
                <div id="registerContent">
                    <InputText 
                        label={"Username"} 
                        idInput={"inputtextusername"} 
                        type={"text"} 
                        placeholder={"min. 5 characters"} 
                        value={valueUsername} 
                        onChange={(text: string) => {setRegisterStates({valueUsername: text.trim(), valuePassword, valueRepeatPassword})}}
                        variant={"outline-primary"}
                    />
                    <InputText 
                        label={"Password"} 
                        idInput={"inputtextpassword"} 
                        type={"password"} 
                        placeholder={"min. 8 characters w/ mayus, minus and digits"} 
                        value={valuePassword} 
                        onChange={(text: string) => {setRegisterStates({valueUsername, valuePassword: text.trim(), valueRepeatPassword})}}
                        variant={"outline-primary"}
                    />
                    <InputText 
                        label={"Confirm Password"} 
                        idInput={"inputtextrepeatpassword"} 
                        type={"password"} 
                        placeholder={"insert the password again"} 
                        value={valueRepeatPassword} 
                        onChange={(text: string) => {setRegisterStates({valueUsername, valuePassword, valueRepeatPassword: text.trim()})}}
                        variant={"outline-primary"}
                    />
                    {showErrors === true ? <section className="errorMsgContainer" ><div>{usernameMsg}</div><div>{passwordMsg}</div><div>{repeatPasswordMsg}</div><div>{usernameRepeatedMsg}</div></section> : null}
                    <CButton BVariant="success" text="REGISTER USER" onClick={senduser} />            
                    <hr />
                    <Link to="/login">Login Page</Link>
                </div>
            </section>
            
        </React.Fragment>
    )
    
}

export default Signup;
