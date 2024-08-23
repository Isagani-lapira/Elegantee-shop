import { useContext, createContext, useState, useEffect } from "react";

const AuthContext = createContext();
const AuthProvider = ({children})=>{

    const [isAuthenticated, setisAuthenticated] = useState(() => {
        const savedAuth = sessionStorage.getItem('isAuthenticated');
        return savedAuth === 'true';
    })

    useEffect(()=>{
        sessionStorage.setItem('isAuthenticated',isAuthenticated);
    },[isAuthenticated])
    const authenticateUser = (username,password)=>{
        if(username=='sa' && password=='sa'){
            setisAuthenticated(true);
            return true;
        }

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