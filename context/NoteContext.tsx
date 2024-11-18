import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import { useAuth } from "./AuthContext";

interface Note {
    id: number;
    title: string;
    description: string;
}

interface NoteProps {
    notes: Note[] | null;
    refreshNotes: () => Promise<Note[] | void>;
    getNote: (id: number) => Note | null;
    addNote: (title: string, description: string) => Promise<boolean | null>;
    deleteNote: (id: number) => Promise<boolean | null>;
}

const NoteContext = createContext<NoteProps | undefined>(undefined);

export const useNote = (): NoteProps => {
    const context = useContext(NoteContext);
    if (!context) {
        throw new Error("useNote must be used within an NoteProvider");
    }
    return context;
};

interface NoteProviderProps {
    children: ReactNode;
}

export const NoteProvider = ({ children }: NoteProviderProps) => {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    const { getToken } = useAuth();
    const [notes, setNotes] = useState<Note[] | null>(null);

    const getNotes = async () => {
        try {
            const cachedNotes = await AsyncStorage.getItem("notes");
            if (cachedNotes) {
                setNotes(JSON.parse(cachedNotes));
            } else {
                const token = await getToken();
                const response = await axios.get(apiUrl + "/api/notes", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                await AsyncStorage.setItem(
                    "notes",
                    JSON.stringify(response.data)
                );
                setNotes(response.data);
            }
        } catch (error) {
            console.error("Failed to fetch or cache notes:", error);
        }
    };

    const getNote = (id: number): Note | null => {
        if (notes) {
            const note = notes.find((note) => note.id === id);
            return note || null;
        }
        return null;
    };

    const addNote = async (
        title: string,
        description: string
    ): Promise<boolean> => {
        try {
            const token = await getToken();

            const response = await axios.post(
                apiUrl + "/api/notes/create",
                {
                    title: title,
                    description: description,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                await AsyncStorage.removeItem("notes");
                getNotes();
                return true;
            } else {
                console.error("Failed to add note:", response);
                return false;
            }
        } catch (error) {
            console.error("Error adding note:", error);
            return false;
        }
    };

    const deleteNote = async (id: number): Promise<boolean> => {
        try {
            const token = await getToken();

            const response = await axios.delete(apiUrl + "/api/notes/" + id, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // If the response is successful, return true
            if (response.status === 200) {
                await AsyncStorage.removeItem("notes");
                getNotes();
                return true;
            } else {
                console.error("Failed to delete note:", response);
                return false;
            }
        } catch (error) {
            console.error("Error deleting note:", error);
            return false;
        }
    };

    useEffect(() => {
        getNotes();
    }, []);

    const value: NoteProps = {
        notes: notes,
        refreshNotes: getNotes,
        getNote: getNote,
        addNote: addNote,
        deleteNote: deleteNote,
    };

    return (
        <NoteContext.Provider value={value}>{children}</NoteContext.Provider>
    );
};
