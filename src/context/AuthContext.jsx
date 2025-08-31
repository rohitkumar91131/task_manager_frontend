import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

const AuthContext = createContext();
export const AuthProvider = ({children}) =>{
    const [isLoginPageInWindow ,setIsLoginPageInWidow] = useState(true);
    return <AuthContext.Provider value={{isLoginPageInWindow ,setIsLoginPageInWidow}}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () =>useContext(AuthContext)