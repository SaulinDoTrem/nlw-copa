import { createContext, ReactNode, useState, useEffect } from "react";
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { api } from '../services/api';

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
        try {
            setIsUserLoading(true);

            const tokenResponse = await api.post('/signin', { accessToken });
            api.defaults.headers.common['Authorization'] = `Bearer ${tokenResponse.data.token}`;

            const userInfoResponse = await api.get('/me');
            setUser(userInfoResponse.data.user);
        } catch(e) {
            console.log(e);
            throw e;
        } finally {
            setIsUserLoading(false);
        }
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