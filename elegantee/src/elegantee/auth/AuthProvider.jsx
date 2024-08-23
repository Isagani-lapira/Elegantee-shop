import { useContext, createContext, useState } from "react";

const AuthContext = createContext();
const AuthProvider = ({children})=>{

    const [isAuthenticated, setisAuthenticated] = useState(false);
    const authenticateUser = (username,password)=>{
        if(username=='sa' && password=='sa'){
            console.log('pumasok')
            setisAuthenticated(true);
            return true;
        }

        return false;
    }
    return (
        <AuthContext.Provider value={{authenticateUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;

export const useAuth = ()=>useContext(AuthContext);