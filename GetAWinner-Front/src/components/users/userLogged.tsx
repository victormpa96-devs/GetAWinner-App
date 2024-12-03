import React, { FC } from "react";
import { useNavigate } from "react-router";
import CButton from "../formElements/button";
import EditUser from "./editUser";
import styles from "./userLogged.module.css";

interface IUserLoggedProps {}

const UserLogged: FC<IUserLoggedProps> = () => {
    const navigate = useNavigate();
    const currentUsername = localStorage.getItem("usernameValue");

    const signOff = () => {
        localStorage.removeItem("getawinnerUserToken"); 
        localStorage.removeItem("usernameValue"); 
        navigate("/login");
    }

    return (
        <React.Fragment>
            <section>
                {currentUsername}
                <EditUser />
                <CButton className={styles.signoffBtn} BVariant={"outline-danger"} text={"Sign Off"} onClick={signOff} />
            </section>
        </React.Fragment>
    )
    
}

export default UserLogged;
