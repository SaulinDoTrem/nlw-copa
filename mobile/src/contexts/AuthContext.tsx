import { createContext, ReactNode, useState, useEffect } from "react";
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

WebBrowser.maybeCompleteAuthSession();

interface UserProps {
    name: string;
    avatarUrl: string;
}

export interface AuthContextDataProps {
    user: UserProps;
    isUserLoading: boolean;
    signIn: () => Promise<void>;
}

interface AuthProviderProps {
    children: ReactNode;
}


export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthProviderProps){

    const [user, setUser] = useState<UserProps>({} as UserProps);
    const [isUserLoading, setIsUserLoading] = useState(false);

    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: '620390518880-hlhpddpqdl8g1aqfttvjp5jlatpv6m7t.apps.googleusercontent.com',
        redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
        scopes: ['profile', 'email']
    });

    const usera = {
        name:'Saulo Klein Nery',
        avatarUrl: 'https://github.com/SaulinDoTrem.png'
    };

    async function signIn(){
        try{
            setIsUserLoading(true);
            await promptAsync();

        } catch(e){
            console.log(e);
            throw e;

        } finally {
            setIsUserLoading(false);
        }
    }

    async function signInWithGoogle(accessToken: string){
        console.log("Token de auth =>", accessToken);
    }   

    useEffect(() => {
        if(response?.type === 'success' && response.authentication?.accessToken)
            signInWithGoogle(response.authentication.accessToken);
    },[response]);

    return (
        <AuthContext.Provider value={{
            signIn,
            user,
            isUserLoading
        }}>
            {children}
        </AuthContext.Provider>
    );
}