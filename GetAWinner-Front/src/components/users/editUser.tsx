import React, { FC, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPen } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "react-bootstrap";
import CButton from "../formElements/button";
import styles from "./editUser.module.css";
import InputText from "../formElements/inputText";
import { thunkUpdateUser } from "../../app/thunk";
import store from "../../app/store";


interface IEditUserProps { }

const EditUser: FC<IEditUserProps> = () => {
    
    const [show, setShow] = useState(false);
    const [showChanges, setShowChanges] = useState(false);
    const [showError, setShowError] = useState(false);
    const [username, setUsername] = useState("");    
    const [usernameErrorMsg, setUsernameErrorMsg] = useState("");    

    const handleClose = () => {
        setUsername("");
        setUsernameErrorMsg("");
        setShowError(false);
        setShowChanges(false);
        setShow(false);
    };

    const handleShow = () => setShow(true);    

    const handleShowChanges = () => {
        if(username.trim() === ""){
            setShowChanges(false);
            setShowError(true);
            setUsernameErrorMsg("The new username field is empty.");
        }else{
            setShowChanges(true);
            setShowError(false);
            setUsernameErrorMsg("");
        }
    }

    const updateUser = () => {
        const newData = {
            username: username
        }       

        store.dispatch(thunkUpdateUser(newData));
    }

    return (
        <React.Fragment>
            <FontAwesomeIcon
                className={styles.editIcon}
                icon={faUserPen}
                onClick={handleShow}
            />         

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title><h2>EDIT USER</h2></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>CHANGE USERNAME</h5>
                    <InputText
                        label={"New Username"} 
                        idInput={"inputchangeusername"} 
                        type={"text"} 
                        placeholder={"insert the new username"} 
                        value={username} 
                        onChange={(text: string) => setUsername(text)} 
                        variant={"warning"}
                    />
                    {
                        showError === true
                        ?
                        <div className={styles.errorMsgContainer}>{usernameErrorMsg}</div>
                        :
                        null
                    }
                    <div className={styles.closesavechangesContainer}>
                        <CButton BVariant={"danger"} text={"CLOSE"} onClick={handleClose} />
                        <CButton BVariant={"success"} text={"SAVE CHANGES"} onClick={handleShowChanges} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {
                        showChanges === true 
                        ?
                        <section>
                            <h5>Your profile data will be updated with these changes:</h5>
                            <strong>Username: </strong>{username}
                            <div className={styles.declineconfirmchangesContainer}>
                                <CButton BVariant={"danger"} text={"DECLINE"} onClick={() => setShowChanges(false)}  />
                                <CButton BVariant={"success"} text={"CONFIRM"} onClick={updateUser} />                       
                            </div>
                        </section>
                        :
                        null
                    }
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    )

}

export default EditUser;
