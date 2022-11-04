import { createContext, ReactNode } from "react";

interface UserProps {
    name: string;
    avatarUrl: string;
}

export interface AuthContextDataProps {
    user: UserProps;
    signIn: () => Promise<void>;
}

interface AuthProviderProps {
    children: ReactNode;
}


export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthProviderProps){

    const user = {
        name:'Saulo Klein Nery',
        avatarUrl: 'https://github.com/SaulinDoTrem.png'
    };

    async function signIn(){
        console.log("Saulo é pica e o resto é buraco");
    }

    return (
        <AuthContext.Provider value={{
            signIn,
            user
        }}>
            {children}
        </AuthContext.Provider>
    );
}