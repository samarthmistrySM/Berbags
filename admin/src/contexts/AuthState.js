import React,{useState,useEffect} from "react";
import AuthContext from "./AuthContext";
import Coookie from 'js-cookie'
import axios from 'axios'
import { jwtDecode } from "jwt-decode";

const AuthState = (props) =>{
    const API_URL = process.env.REACT_APP_API_URL;

    const [loggedUser, setLoggedUser] = useState({});

    useEffect(() => {

    try {
        const token = Coookie.get('token');

        if(token){
            const userId = jwtDecode(token).userId;
            // const reponse = axios.post(`${API_URL}/users/${userId}`)
        }
    } catch (error) {
        console.log(error);
    }

    }, [])
    


    const update = async() =>{

    }


    return (
        <AuthContext.Provider value={{loggedUser,update}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;