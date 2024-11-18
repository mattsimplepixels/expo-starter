import { router, useLocalSearchParams } from "expo-router";
import { Pressable, View } from "react-native";
import { useNote } from "~/context/NoteContext";
import { Text } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Button } from "~/components/ui/button";

export default function Note() {
    const { id } = useLocalSearchParams();
    const { getNote, deleteNote } = useNote();

    const note = getNote(Number(id));

    const handleGoBack = () => {
        router.back();
    };

    const handleDelete = () => {
        deleteNote(Number(id));

        router.back();
    };

    return (
        <View className="flex-1 justify-between gap-10 p-6 bg-surface-a10">
            <View className="flex-1 gap-10">
                <Pressable onPress={handleGoBack}>
                    <View className="flex flex-row gap-5 items-center">
                        <AntDesign name="arrowleft" size={24} color="white" />
                        <Text className="font-bold text-3xl text-white">
                            {note?.title}
                        </Text>
                    </View>
                </Pressable>
                <Text className="text-lg text-white">{note?.description}</Text>
            </View>
            <Button
                onPress={handleDelete}
                variant="outline"
                className="border-[#ff4545] mb-10"
            >
                <Text className="font-bold text-md text-[#ff4545]">
                    Delete Note
                </Text>
            </Button>
        </View>
    );
}
