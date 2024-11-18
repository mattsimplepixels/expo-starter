import { ScrollView, Text, View } from "react-native";
import { Button } from "~/components/ui/button";
import { useAuth } from "~/context/AuthContext";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { useEffect, useState } from "react";
import Note from "~/components/Note";
import { Link, router } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNote } from "~/context/NoteContext";

// Define the structure of a note
interface NoteType {
    id: number;
    title: string;
    description: string;
}

export default function Home() {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    const { authState, onLogout, getToken } = useAuth();
    const { notes } = useNote();

    const handleNotePress = () => {
        router.push("/add-note");
    };

    return (
        <View className="flex-1 justify-between gap-10 p-6 bg-surface-a0 pt-[150px]">
            <View className="flex flex-col items-center gap-2">
                <EvilIcons name="user" size={64} color="#7a3dfc" />
                <Text className="font-bold text-4xl text-white">
                    Welcome back, {authState.name}
                </Text>
                <Text className="text-center text-lg text-white/80 max-w-[300px]">
                    You have successfully logged into your account. To update
                    your account details, click the settings tab at the bottom
                    of the screen. Note
                </Text>
                <Button
                    onPress={onLogout}
                    className="bg-primary-a10 mt-3 w-[100px]"
                >
                    <Text className="text-white">Logout</Text>
                </Button>
            </View>
            <View className="flex flex-col gap-6">
                <View className="flex flex-row items-center justify-between">
                    <Text className="font-bold text-3xl text-white">Notes</Text>
                    <Button
                        onPress={handleNotePress}
                        variant="outline"
                        className="border-surface-a20 mt-3"
                    >
                        <Text className="text-white">Add note</Text>
                    </Button>
                </View>
                <ScrollView
                    className="w-full h-[250px] gap-5"
                    horizontal={true}
                >
                    {notes &&
                        notes.map((note) => (
                            <Note
                                key={note.id}
                                id={note.id}
                                title={note.title}
                                text={note.description}
                            />
                        ))}
                </ScrollView>
            </View>
        </View>
    );
}
