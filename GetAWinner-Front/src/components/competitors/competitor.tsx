import React, { FC } from "react";
import { ListGroupItem } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import store from "../../app/store";
import { thunkDeleteCompetitor } from "../../app/thunk";
import CButton from "../formElements/button";

interface ICompetitorProps {
    _id?: string;    
    name?: string;
}

const Competitor: FC<ICompetitorProps> = ({_id, name}) => {

    const navigate = useNavigate();

    const deleteCompetitor = async (event: any) => {
        const idCompetitor = event.target.parentElement.id;
        
        const deleteCompetitor: any = await store.dispatch(thunkDeleteCompetitor(idCompetitor));

        if(deleteCompetitor === "TOKEN EXPIRED" || deleteCompetitor === "'X-Session-Token' HEADER IS EMPTY"){
            navigate("/login");
            alert("Your session has expired, please log in again.");
        }
        
    }

    return (
        <React.Fragment>
            <ListGroupItem className="competitor" as="li" id={`${_id}`}>
                <div>{name}</div>
                <CButton BVariant={"danger"} text={"X"} onClick={(event: string) => deleteCompetitor(event)} />
            </ListGroupItem>
        </React.Fragment>
    )
}

export default Competitor;