import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import store from "../../app/store";
import { thunkPostCompetitor } from "../../app/thunk";
import CButton from "../formElements/button";
import InputText from "../formElements/inputText";
import { ICompetitor } from "../main";
import styles from "./createCompetitor.module.css";


interface ICreateCompetitorProps {}

const CreateCompetitor: FC<ICreateCompetitorProps> = () => {

    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [showErrorMsg, setShowErrorMsg] = useState(false);

    const sendCompetitor = async () => {
        const competitor: ICompetitor = {
            name: name.trim()
        }

        const postCompetitor: any = await store.dispatch(thunkPostCompetitor(competitor));
        setName("");

        switch (postCompetitor){
            case "TOKEN EXPIRED":
            case "'X-Session-Token' HEADER IS EMPTY":
                navigate("/login");
                alert("Your session has expired, please log in again.");
                break;
            case "NAME PARAM IS EMPTY":
                setErrorMsg("Competitor's name is empty");
                setShowErrorMsg(true);
                break;
            case "NAME ALREADY EXISTS":
                setErrorMsg("This competitor already exist");
                setShowErrorMsg(true);
                break;
            default:{
                setErrorMsg("");
                setShowErrorMsg(false);
            }
        }        
        
    }

    return(
        <React.Fragment>
            <div className={styles.inputsContainer}>
                <InputText
                    className={styles.inputtextCompetitor}
                    label={"Add Competitor"} 
                    idInput={"inputtextnewcompetitor"} 
                    type={"text"} 
                    placeholder={"insert a new competitor's name"}
                    value={name} 
                    onChange={(text: string) => setName(text)}
                    variant="warning"
                />
                <CButton className={styles.createCompetitorBtn} BVariant={"success"} text={"+"} onClick={sendCompetitor} />               
            </div>
            {showErrorMsg === true ? <div className="errorMsgContainer">{errorMsg}</div> : null}         
        </React.Fragment>
    )
}   

export default CreateCompetitor;