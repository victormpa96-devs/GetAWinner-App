import { ICompetitor, IUser } from "../components/main"


export interface IReducerProps{    
    users: IUser[],
    competitors: ICompetitor[]
}

const initialState: IReducerProps = {
    users: [],
    competitors: []
}

function rootReducer(state: IReducerProps  = initialState , action: any): IReducerProps {
    switch (action.type) {
        case "users/registerUser": {                      
            const newUsers = [...state.users, action.payload];
            return {...state,users:newUsers}
        }
        case "users/loginUser": {                      
            const token = action.payload;    
            localStorage.setItem("getawinnerUserToken", token);            
            return {...state}  
        }
        case "competitors/getCompetitors": {
            return {...state,competitors:action.payload}
        }
        case "competitors/postCompetitor": {                      
            const newCompetitors = [...state.competitors, action.payload];
            return {...state,competitors:newCompetitors}
        }
        case "competitors/deleteCompetitor": {                      
            const idCompetitorToDelete = action.payload.response._id;             
            const newCompetitors = [...state.competitors.filter(competitor => competitor._id !== idCompetitorToDelete)];
            return {...state,competitors:newCompetitors}
        }
        default:
            return state;
    }
}

export default rootReducer;