import React, { useEffect } from "react";
import store, { RootState } from "../app/store";
import { thunkGetCompetitors } from "../app/thunk";
import CompetitorList from "./competitors/competitorsList";
import CreateCompetitor from "./competitors/createCompetitor";
import { useSelector } from 'react-redux';
import UserLogged from "./users/userLogged";
import { useNavigate } from "react-router";
import styles from "./main.module.css";
import DrawHeader from "./competitors/drawHeader";


export interface IUser {
    _id?: string;
    username: string;
    password: string;
}

export interface ICompetitor {
    _id?: string;
    name: string;
    createdBy?: string;
}


const Main = () => {

    const navigate = useNavigate();
    const competitorsUS: ICompetitor[] = useSelector((state: RootState) => state.competitors);    
    
    const getCompetitors = async () => {
        const getCompetitors: any = await store.dispatch(thunkGetCompetitors);

        if((getCompetitors === "'X-Session-Token' HEADER IS EMPTY")||(getCompetitors === "TOKEN EXPIRED")){
            alert("Your session has expired, please log in again.");
            navigate("/login");
        }        
    }

    useEffect(() => {
        getCompetitors();
        localStorage.removeItem("winners");
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <React.Fragment>
            <section id="mainContainer">
                <div className={styles.headerContainer}>
                    <header className={styles.header}>
                        <CreateCompetitor />
                        <UserLogged />
                    </header>
                    <DrawHeader /> 
                </div>                
                <CompetitorList competitors={competitorsUS} />
            </section>            
        </React.Fragment>
    )
}

export default Main;