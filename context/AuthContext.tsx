import { createContext, useContext, useState, ReactNode } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

interface User {
    name: string | null;
    email: string | null;
}

interface AuthState {
    authenticated: boolean | null;
    name: string | null;
    email: string | null;
}

interface AuthProps {
    authState: AuthState;
    onLogin: (email: string, password: string) => Promise<void>;
    onLogout: () => Promise<void>;
    getToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthProps | undefined>(undefined);

export const useAuth = (): AuthProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;

    const [authState, setAuthState] = useState<AuthState>({
        authenticated: false,
        name: null,
        email: null,
    });

    const login = async (email: string, password: string): Promise<void> => {
        try {
            const token = await getTokenPost(email, password);
            console.log(token);
            if (token) {
                setAuthState({
                    authenticated: true,
                    name: "Test",
                    email: email,
                });
            } else {
                console.error("Failed to retrieve token");
                setAuthState({
                    authenticated: false,
                    name: null,
                    email: null,
                });
            }
        } catch (error) {
            console.error("Error during login:", error);
            setAuthState({
                authenticated: false,
                name: null,
                email: null,
            });
        }
    };

    const logout = async (): Promise<void> => {
        try {
            await SecureStore.deleteItemAsync("token");
        } catch (error) {
            console.error("Error clearing token during logout:", error);
        }
        setAuthState({
            authenticated: false,
            name: null,
            email: null,
        });
    };

    const getTokenPost = async (
        email: string,
        password: string
    ): Promise<User | null> => {
        try {
            const response = await axios.post(apiUrl + "/api/token", {
                email: email,
                password: password,
                device_name: "Test's Phone",
            });
            const { token, user } = response.data;
            await SecureStore.setItemAsync("token", token);
            return { name: user.name, email: user.email };
        } catch (error) {
            console.error("Error retrieving token:", error);
            return null;
        }
    };

    const getToken = async (): Promise<string | null> => {
        try {
            const token = await SecureStore.getItemAsync("token");
            return token;
        } catch (error) {
            console.error("Error retrieving token from secure store:", error);
            return null;
        }
    };

    const value: AuthProps = {
        authState,
        onLogin: login,
        onLogout: logout,
        getToken,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
