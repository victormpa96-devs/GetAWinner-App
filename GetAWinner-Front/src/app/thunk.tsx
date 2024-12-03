import axios, { AxiosRequestConfig } from "axios";

export const thunkRegisterUser = (params: any) => async (dispatch: any, getState: any) => {
    
    try {
        const response = await axios.post('http://localhost:3000/users/register', params);
        dispatch({
            type: "users/registerUser", 
            payload: response.data
        });
    } catch (error: any) {
        return error.response.data;
    }
}

export const thunkLoginUser = (params: any) => async (dispatch: any, getState: any) => {
    
    try {
        const response: any = await axios.post('http://localhost:3000/users/login', params);
        dispatch({
            type: "users/loginUser", 
            payload: response.data.token
        });

        return response;   
        
    } catch (error: any) {
        return error;
    }
}

export const thunkUpdateUser = (params: any) => async (dispatch: any, getState: any) => {
    try {        
        const getToken = localStorage.getItem("getawinnerUserToken");
        const token = getToken !== null ? getToken : "";

        const config: AxiosRequestConfig<any>= {
            headers:{
              "X-Session-Token": token
            }
        };  

        const responseGET = await axios.get('http://localhost:3000/users/profile/data', config);
        const idUser = responseGET.data.idUser;     
        
        const responsePUT = await axios.put('http://localhost:3000/users/' + idUser, params, config);
        console.log(responsePUT);
        
        /* dispatch({
            type: "users/updateUser"
        }); */

        // falta cambiar las cosas en local (en el reducer???)
    } catch (error: any) {
        return error.response.data;
    }
}

export const thunkGetCompetitors = async (dispatch: any, getState: any) => {
    
    try {
        const getToken = localStorage.getItem("getawinnerUserToken");
        const token = getToken !== null ? getToken : "";

        const config: AxiosRequestConfig<any>= {
            headers:{
              "X-Session-Token": token
            }
        };       

        const response = await axios.get('http://localhost:3000/competitors', config);
        
        dispatch({
            type: "competitors/getCompetitors", 
            payload: response.data
        });
    } catch (error: any) {
        return error.response.data;
    }
}

export const thunkPostCompetitor = (params: any) => async (dispatch: any, getState: any) => {
    
    try {
        const getToken = localStorage.getItem("getawinnerUserToken");
        const token = getToken !== null ? getToken : "";

        const config: AxiosRequestConfig<any>= {
            headers:{
              "X-Session-Token": token
            }
        };       

        const response = await axios.post('http://localhost:3000/competitors', params, config); 
        
        dispatch({
            type: "competitors/postCompetitor", 
            payload: response.data
        });

        return response;
    } catch (error: any) {
        return error.response.data;
    }
}

export const thunkDeleteCompetitor = (params: any) => async (dispatch: any, getState: any) => {
    
    try {
        const getToken = localStorage.getItem("getawinnerUserToken");
        const token = getToken !== null ? getToken : "";

        const config: AxiosRequestConfig<any>= {
            headers:{
              "X-Session-Token": token
            }
        };       

        const response = await axios.delete('http://localhost:3000/competitors/'+params, config); 
        
        dispatch({
            type: "competitors/deleteCompetitor", 
            payload: response.data
        });

        return response;
    } catch (error: any) {
        return error.response.data;
    }
}