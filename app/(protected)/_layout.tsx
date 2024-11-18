import { Stack } from "expo-router";
import { NoteProvider } from "~/context/NoteContext";

export default function AddCardLayout() {
    return (
        <NoteProvider>
            <Stack
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen
                    name="add-note"
                    options={{ headerShown: false, presentation: "modal" }}
                />
                <Stack.Screen
                    name="note/[id]"
                    options={{ headerShown: false, presentation: "modal" }}
                />
            </Stack>
        </NoteProvider>
    );
}
