import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import store from "../../app/store";
import styles from "./drawHeader.module.css";

interface IDrawHeader { }

const DrawHeader: FC<IDrawHeader> = () => {

    const navigate = useNavigate();

    const Competitors = store.getState().competitors;    
    const [numOfWinners, setNumOfWinners] = useState(1);
    const [typeDraw, setTypeDraw] = useState("classic");
    const [errorMsg, setErrorMsg] = useState("");
    const [showError, setShowError] = useState(false);
    const [nowDisable, setNowDisable] = useState(false);

    const blockLetters = (e: any) => {
        
        e = e || window.event;        
        let error = false;

        if(!e.key.match(/^[0-9]+$/)){
            error = true;
        }
        if((e.keyCode === 8) || (e.code === "Backspace")){
            error = false;
        }
        if((e.keyCode === 46) || (e.code === "Delete")){
            error = false;
        }
        if((e.keyCode === 37) || (e.code === "ArrowLeft")){
            error = false;
        }
        if((e.keyCode === 39) || (e.code === "ArrowRight")){
            error = false;
        }

        if(error){
            e.preventDefault();
        }               
    }

    const typeDrawFN = (e: any) => {        
        
        setTypeDraw(e.target.value); 

        if(e.target.value === "best-of-three"){
            setNowDisable(true);
        }else{
            setNowDisable(false);
        }
    }

    const getWinner = () => {

        if(typeDraw === "classic" && Competitors.length > numOfWinners){
            setShowError(false);

            let currentNumOfWinners: string | Number = numOfWinners.toString();

            if(!currentNumOfWinners.match(/^[0-9]+$/)){                
                setNumOfWinners(1);
                currentNumOfWinners = 1;
            }else{
                currentNumOfWinners = Number(currentNumOfWinners);
            } 

            let winners:string[] = [];

            for(let i = 0; i < currentNumOfWinners; i++){
                const randomCompetitor = Competitors[Math.floor(Math.random() * Competitors.length)];
                const match = winners.find(competitor => competitor === randomCompetitor.name);
                if(match){
                    i--;
                }else{
                    winners.push(randomCompetitor.name);
                }
            }

            localStorage.setItem("winners", JSON.stringify({winners: winners}));
            navigate("/winner");       

        }else if(typeDraw === "classic" && Competitors.length <= numOfWinners){
            setErrorMsg("The number of winners must be less than number of competitors.");
            setShowError(true);
        }

        if(typeDraw === "best-of-three" && Competitors.length >= 3){

            let overtakings:string[] = [];
            let candidates:string[] = [];

            for(let i = 0; i < 3; i++){
                const randomCompetitor = Competitors[Math.floor(Math.random() * Competitors.length)];
                const match = candidates.find(competitor => competitor === randomCompetitor.name);
                if(match){
                    i--;
                }else{
                    candidates.push(randomCompetitor.name);
                }
            }

            let pass = false;

            while(!pass){
                const randomCompetitor = candidates[Math.floor(Math.random() * candidates.length)];

                overtakings.push(randomCompetitor);

                const getEqual = overtakings.filter(candidate => candidate === randomCompetitor);

                if(getEqual.length >= 3){
                    localStorage.setItem("winners", JSON.stringify({winners: randomCompetitor, overtakings: overtakings}));                   
                    pass = true;
                }
            }

            setShowError(false);
            navigate("/winner");

        }else if(typeDraw === "best-of-three"){
            setErrorMsg("This type of draw requires at least three competitors.");
            setShowError(true);
        }
        

    }

    return (
        <React.Fragment>
            <section className={styles.drawHeaderContainer}>
                <div className={styles.drawconfigContainer}>
                    <div className={styles.numWinnersContainer} >
                        <label className={styles.labelNumWinners} htmlFor="inputNumWinners">Nº of winners</label>
                        {nowDisable === true 
                            ? <input disabled min={1} type="number" className={styles.inputNumWinners} id="inputNumWinners" onKeyDown={(e: any) => blockLetters(e)} onChange={(e: any) => setNumOfWinners(e.target.value)} value={numOfWinners}/>
                            : <input min={1} max={Competitors.length-1} type="number" className={styles.inputNumWinners} id="inputNumWinners" onKeyDown={(e: any) => blockLetters(e)} onChange={(e: any) => setNumOfWinners(e.target.value)} value={numOfWinners}/>                     
                        }
                    </div>
                    <div className={styles.typeDrawContainer}>
                        <label className={styles.labelTypeDraw} htmlFor="selectTypeDraw">Type of draw</label>
                        <select className={styles.selectTypeDraw} id="selectTypeDraw" defaultValue={"classic"} onChange={(e: any) => typeDrawFN(e)}>
                            <option value="classic">Classic</option>
                            <option value="best-of-three">Best of three</option>                        
                        </select>
                    </div>
                </div>                
                <div className={styles.getawinner} onClick={getWinner}>GET WINNER</div>
            </section>
            {showError === true 
                ? <div className="errorMsgContainer">{errorMsg}</div>
                : null
            }
        </React.Fragment>
    )
}

export default DrawHeader;
