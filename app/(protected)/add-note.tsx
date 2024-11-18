import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router"; // Import useRouter for navigation
import { useAuth } from "~/context/AuthContext";
import axios from "axios";
import { useNote } from "~/context/NoteContext";

export default function AddNote() {
    const { addNote } = useNote();

    const [noteFields, setNoteFields] = useState({
        title: "",
        description: "",
    });

    const router = useRouter(); // Initialize the router

    const handleChangeTitle = (title: string) => {
        setNoteFields((prevFields) => ({
            ...prevFields,
            title: title,
        }));
    };

    const handleChangeDescription = (description: string) => {
        setNoteFields((prevFields) => ({
            ...prevFields,
            description: description,
        }));
    };

    const handleGoBack = () => {
        router.back();
    };

    const handleAddNote = async () => {
        const noteAdded = addNote(noteFields.title, noteFields.description);
        if (await noteAdded) {
            router.back();
        }
    };

    return (
        <View className="flex-1 gap-10 p-6 bg-surface-a10">
            <Pressable onPress={handleGoBack}>
                <View className="flex flex-row gap-5 items-center">
                    <AntDesign name="arrowleft" size={24} color="white" />
                    <Text className="font-bold text-3xl text-white">
                        Add a new note
                    </Text>
                </View>
            </Pressable>

            <View className="flex flex-col gap-5">
                <Input
                    className="w-full bg-surface-a10 border-surface-a20 text-white/90 placeholder:text-white/50"
                    placeholder="Enter the title"
                    value={noteFields.title}
                    onChangeText={handleChangeTitle}
                />

                <Textarea
                    className="w-full bg-surface-a10 border-surface-a20 text-white/90 placeholder:text-white/50 h-[200px]"
                    placeholder="Enter the description"
                    value={noteFields.description}
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={handleChangeDescription}
                />
                <Button
                    className="w-full bg-primary-a10"
                    onPress={handleAddNote}
                >
                    <Text className="text-surface-a0 font-semibold text-lg">
                        Add note
                    </Text>
                </Button>
            </View>
        </View>
    );
}
