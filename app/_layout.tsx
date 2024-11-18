import { Stack, useRouter, useSegments, SplashScreen } from "expo-router";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { useEffect } from "react";

import "~/global.css";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Theme, ThemeProvider } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Platform } from "react-native";
import { NAV_THEME } from "~/lib/constants";
import { useColorScheme } from "~/lib/useColorScheme";

const LIGHT_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.light,
  fonts: {
    regular: {
      fontFamily: "",
      fontWeight: "bold",
    },
    medium: {
      fontFamily: "",
      fontWeight: "bold",
    },
    bold: {
      fontFamily: "",
      fontWeight: "bold",
    },
    heavy: {
      fontFamily: "",
      fontWeight: "bold",
    },
  },
};

const DARK_THEME: Theme = {
  dark: true,
  colors: NAV_THEME.dark,
  fonts: {
    regular: {
      fontFamily: "",
      fontWeight: "bold",
    },
    medium: {
      fontFamily: "",
      fontWeight: "bold",
    },
    bold: {
      fontFamily: "",
      fontWeight: "bold",
    },
    heavy: {
      fontFamily: "",
      fontWeight: "bold",
    },
  },
};

export { ErrorBoundary } from "expo-router";

function StackLayout() {
  const { authState } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === "(protected)";

    if (authState?.authenticated === false && inAuthGroup) {
      router.replace("/log-in");
    } else if (authState?.authenticated === true && !inAuthGroup) {
      router.replace("/(protected)/(tabs)");
    }
  }, [authState, segments, router]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="log-in" options={{ headerShown: false }} />
      <Stack.Screen
        name="/(protected)/(tabs)"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}

function RootLayout() {
  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const theme = await AsyncStorage.getItem("theme");
      if (Platform.OS === "web") {
        // Adds the background color to the html element to prevent white background on overscroll.
        document.documentElement.classList.add("bg-background");
      }
      if (!theme) {
        await AsyncStorage.setItem("theme", colorScheme);
        setIsColorSchemeLoaded(true);
        return;
      }
      const colorTheme = theme === "dark" ? "dark" : "light";
      if (colorTheme !== colorScheme) {
        setColorScheme(colorTheme);
      }
      setIsColorSchemeLoaded(true);
    })().finally(() => {
      SplashScreen.hideAsync();
    });
  }, [colorScheme, setColorScheme]);

  if (!isColorSchemeLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={DARK_THEME}>
      <AuthProvider>
        <StackLayout />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default RootLayout;
