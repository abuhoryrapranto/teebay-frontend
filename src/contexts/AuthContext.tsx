import { createContext, useState, useEffect } from "react";

type AuthContextData = {
    token : string | null,
    login: (toekn : string) => void,
    logout: (toekn : string) => void
}

export const AuthContext = createContext<AuthContextData>({
    token: null,
    login: () => {},
    logout: () => {},
});

export function AuthProvider({ children } : any) {

    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const existToken = localStorage.getItem('token');
        if (existToken) {
          setToken(existToken);
        }
    }, []);

    const login = (newToken: string) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
    };
    
    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
    };

    return (

        <AuthContext.Provider value={{ token, login, logout }}>

            {children}

        </AuthContext.Provider>

        );
    
}
