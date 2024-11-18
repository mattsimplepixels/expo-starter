import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Redirect, router, Stack, Tabs } from "expo-router";
import { Text, View } from "react-native";

export default function HomeLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "white", // Active tab icon color
        tabBarStyle: {
          backgroundColor: "#28283a",
          borderTopColor: "#3f3f4f",
          borderTopWidth: 2,
        },
        tabBarLabelStyle: {
          fontFamily: "RobotoMono_300Light",
          fontSize: 10,
          color: "#fff",
        },
        tabBarLabelPosition: "below-icon",
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={24} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={24} name="cog" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
