import React, { FC } from "react";
import { ListGroup } from "react-bootstrap";
import { ICompetitor } from "../main";
import Competitor from "./competitor";

interface ICompetitorsListProps {
    competitors: ICompetitor[];    
}

const CompetitorList: FC<ICompetitorsListProps> = ({competitors}) => {
    return (
        <React.Fragment>
            <main id="listCompetitorsContainer">
                <ListGroup id="listCompetitors">
                    {competitors.map((competitor:ICompetitor, index) => <Competitor key={competitor._id} _id={competitor._id} name={competitor.name} /> )}
                </ListGroup> 
            </main>            
        </React.Fragment>
    )
}

export default CompetitorList;