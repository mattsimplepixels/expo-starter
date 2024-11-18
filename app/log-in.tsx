import * as React from "react";
import { Text, View } from "react-native";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useState } from "react";
import { useAuth } from "~/context/AuthContext";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export default function Login() {
    const { onLogin } = useAuth();

    const [loginFields, setLoginFields] = useState({
        email: "",
        password: "",
    });

    const handleChangeEmail = (text: string) => {
        setLoginFields((prevFields) => ({
            ...prevFields,
            email: text,
        }));
    };

    const handleChangePassword = (text: string) => {
        setLoginFields((prevFields) => ({
            ...prevFields,
            password: text,
        }));
    };

    const handleLogin = async () => {
        onLogin!(loginFields.email, loginFields.password);
    };

    return (
        <View className="flex-1 justify-center items-center gap-5 p-6 bg-surface-a0">
            <FontAwesome6 name="laravel" size={86} color="#7a3dfc" />
            <Input
                className="w-full bg-surface-a10 border-surface-a20 text-white/90 placeholder:text-white/50"
                placeholder="Enter your email"
                autoCapitalize="none"
                autoComplete="email"
                inputMode="email"
                value={loginFields.email}
                onChangeText={handleChangeEmail}
            />
            <Input
                className="w-full bg-surface-a10 border-surface-a20 text-white/90 placeholder:text-white/50"
                placeholder="Enter your password"
                autoCapitalize="none"
                autoComplete="current-password"
                secureTextEntry={true}
                value={loginFields.password}
                onChangeText={handleChangePassword}
            />
            <Button className="w-full bg-primary-a10" onPress={handleLogin}>
                <Text className="text-surface-a0 font-semibold text-lg">
                    Login
                </Text>
            </Button>
        </View>
    );
}
