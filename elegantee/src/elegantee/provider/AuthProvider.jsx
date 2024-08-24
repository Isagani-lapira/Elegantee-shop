import { useContext, createContext, useState, useEffect } from "react";
import { authenticateUsers } from "../api/AuthAPI/Authentication";
import { APIClient } from "../api/AuthAPI/APIClient";

const AuthContext = createContext();
const AuthProvider = ({children})=>{

    const [isAuthenticated, setisAuthenticated] = useState(() => {
        const savedAuth = sessionStorage.getItem('isAuthenticated');
        return savedAuth === 'true';
    })

    useEffect(()=>{
        sessionStorage.setItem('isAuthenticated',isAuthenticated);
    },[isAuthenticated])


    const authenticateUser = async (username,password)=>{
        const results = await authenticateUsers(username,password)
                .then((response)=>{
                    if(response.status==200){
                        setisAuthenticated(true);

                        const token = "Bearer "+response.data; //JWT token

                        //make every request add authorization with this token
                        APIClient.interceptors.request.use((config)=>{
                            config.headers.Authorization = token;
                            return config;
                        })
                        return true;
                    }
                })

        return false;
    }
    return (
        <AuthContext.Provider value={{authenticateUser,isAuthenticated}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;

export const useAuth = ()=>useContext(AuthContext);