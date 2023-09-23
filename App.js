import React from "react";
import { StatusBar } from "expo-status-bar";
import { AppRegistry } from "react-native";
import { PaperProvider } from "react-native-paper";
import { StyleSheet, Text, View } from "react-native";
import {
	NavigationContainer,
	DefaultTheme,
	DarkTheme,
} from "@react-navigation/native";
import BottomNav from "./components/BottomNav";

// theme
import { useMaterial3Theme } from "@pchmn/expo-material3-theme";
import { useColorScheme } from "react-native";
import {
	MD3DarkTheme,
	MD3LightTheme,
	adaptNavigationTheme,
} from "react-native-paper";

export default function App() {
	// react native paper theme
	const colorScheme = useColorScheme();
	const { theme } = useMaterial3Theme();
	const paperTheme =
		colorScheme === "dark"
			? { ...MD3DarkTheme, colors: theme.dark }
			: { ...MD3LightTheme, colors: theme.light };

	// to sync paper theme with react navigation theme
	const { LightTheme, DarkTheme } = adaptNavigationTheme({
		reactNavigationLight: DefaultTheme,
		materialLight: MD3LightTheme,
		reactNavigationDark: DarkTheme,
		materialDark: MD3DarkTheme,
	});
  const navigationTheme = colorScheme === 'dark' ? DarkTheme : LightTheme;

	return (
		<PaperProvider theme={paperTheme}>
			<NavigationContainer
				theme={navigationTheme}
			>
				<StatusBar style="auto" />
				<BottomNav />
			</NavigationContainer>
		</PaperProvider>
	);
}

AppRegistry.registerComponent("eiot", () => Main);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
