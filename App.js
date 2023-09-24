import React from "react";
import { AppRegistry } from "react-native";
import { PaperProvider } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

// theme imports
import { useMaterial3Theme } from "@pchmn/expo-material3-theme";
import { useColorScheme } from "react-native";
import {
	MD3DarkTheme,
	MD3LightTheme,
	adaptNavigationTheme,
} from "react-native-paper";

// paper components
import { BottomNavigation } from "react-native-paper";

// routes
import Home from "./routes/Home";
import Graph from "./routes/Graph";
import Settings from "./routes/Settings";

export default function Main() {
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
	const navigationTheme = colorScheme === "dark" ? DarkTheme : LightTheme;

	// temp states for bottom nav
	const [index, setIndex] = React.useState(0);

	// temp routes
	const [routes] = React.useState([
		{
			key: "home",
			title: "Home",
			focusedIcon: "home",
			unfocusedIcon: "home-outline",
		},
		{
			key: "graph",
			title: "Graph",
			focusedIcon: "chart-areaspline",
		},
		{
			key: "settings",
			title: "Settings",
			focusedIcon: "cog",
			unfocusedIcon: "cog-outline",
		},
	]);

	const renderScene = BottomNavigation.SceneMap({
		home: Home,
		graph: Graph,
		settings: Settings,
	});

	return (
		<PaperProvider theme={paperTheme}>
			<NavigationContainer theme={navigationTheme}>
				<StatusBar />
				<BottomNavigation
					navigationState={{ index, routes }}
					onIndexChange={setIndex}
					renderScene={renderScene}
				/>
			</NavigationContainer>
		</PaperProvider>
	);
}

AppRegistry.registerComponent("eiot", () => Main);
