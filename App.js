import React from "react";
import { StatusBar } from "expo-status-bar";
import { AppRegistry } from "react-native";
import { PaperProvider } from "react-native-paper";
import { StyleSheet, SafeAreaView } from "react-native";
import {
	NavigationContainer,
	DefaultTheme,
	DarkTheme,
} from "@react-navigation/native";
import BottomNav from "./components/BottomNav";

// theme imports
import { useMaterial3Theme } from "@pchmn/expo-material3-theme";
import { useColorScheme } from "react-native";
import {
	MD3DarkTheme,
	MD3LightTheme,
	adaptNavigationTheme,
} from "react-native-paper";

// paper components
import { BottomNavigation, Text } from 'react-native-paper';

// temp components
const MusicRoute = () => <SafeAreaView><Text>Music</Text></SafeAreaView>;
const AlbumsRoute = () => <Text>Albums</Text>;
const RecentsRoute = () => <Text>Recents</Text>;
const NotificationsRoute = () => <Text>Notifications</Text>;

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

  // temp states for bottom nav
  const [index, setIndex] = React.useState(0);

  // temp routes 
  const [routes] = React.useState([
    { key: 'music', title: 'Favorites', focusedIcon: 'heart', unfocusedIcon: 'heart-outline'},
    { key: 'albums', title: 'Albums', focusedIcon: 'album' },
    { key: 'recents', title: 'Recents', focusedIcon: 'history' },
    { key: 'notifications', title: 'Notifications', focusedIcon: 'bell', unfocusedIcon: 'bell-outline' },
  ]);
  const renderScene = BottomNavigation.SceneMap({
    music: MusicRoute,
    albums: AlbumsRoute,
    recents: RecentsRoute,
    notifications: NotificationsRoute,
  });

	return (
		<PaperProvider theme={paperTheme}>
			<NavigationContainer
				theme={navigationTheme}
			>
				<StatusBar/>
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

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
