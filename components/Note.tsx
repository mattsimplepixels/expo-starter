import { View, Text } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { Link } from "expo-router";

interface NoteProps {
    id: number;
    title: string;
    text: string;
}

export default function Note({ id, title, text }: NoteProps) {
    return (
        <View className="h-[250] w-[300px] mr-6 rounded-lg bg-surface-a10 border-surface-a20 border-2  p-6 flex flex-col gap-4">
            <Link href={`/note/${id}`}>
                <View className="flex flex-row w-full items-center justify-between">
                    <Text className="text-white text-lg">{title}</Text>
                    <Feather name="arrow-up-right" size={24} color="white" />
                </View>
            </Link>
            <Text className="text-white/80">{text}</Text>
        </View>
    );
}
