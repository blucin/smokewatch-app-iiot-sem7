import React from "react";
import { AppRegistry } from "react-native";
import { PaperProvider } from "react-native-paper";
import { StyleSheet, SafeAreaView, View, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
//import BottomNav from "./components/BottomNav";

// theme imports
import { useMaterial3Theme } from "@pchmn/expo-material3-theme";
import { useColorScheme } from "react-native";
import {
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
} from "react-native-paper";

// paper components
import { BottomNavigation, Text, Card, Divider, SegmentedButtons } from "react-native-paper";
import { Appbar, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// temp components
function HomeRoute() {
  const theme = useTheme();
  console.log("theme", theme.colors.primary)
  return (
    <SafeAreaView style={[styles.container]}>
      <Appbar.Header style={{ backgroundColor: theme.colors.elevation.level2 }}>
        <Appbar.Content title="Home" />
      </Appbar.Header>
      <View style={[styles.sub_container]}>
        <View style={{ alignItems: "center" }}>
          <Icon name="smoke-detector-variant-alert" size={210} color={theme.colors.tertiary} />
        </View>
        {/* TODO: Wrap content below icon in a scrollable */}
        <Card>
          <View style={{ flexDirection: "row", padding: 10 }}>
            <View style={{ alignItems: "left", flex: 1, paddingLeft: 10 }}>
              <Icon name="smoke" size={80} color={theme.colors.tertiary} />
            </View>
            <View style={{ flex: 2, justifyContent: "center" }}>
              <Text variant="displaySmall">Smoke</Text>
              <Text variant="titleLarge">250 PPM</Text>
            </View>
          </View>
        </Card>

        <Card>
          <Card.Content>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                marginBottom: 10,
              }}
            >
              <Icon name="map-marker" size={40} color={theme.colors.tertiary}/>
              <Text variant="displaySmall">Location:</Text>
            </View>
            <Divider style={{ padding: 1, marginBottom: 10 }} />
            <Text variant="titleMedium" style={{ paddingLeft: 10 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
          </Card.Content>
        </Card>
        <SegmentedButtons
        value={"led"}
        onValueChange={()=>{}}
        buttons={[
          {
            icon: 'lightbulb-on',
            value: 'led',
            label: 'Debug LED',
          },
          {
            icon: 'alert',
            value: 'call',
            label: 'Call For Help',
          },
        ]}
      />
      </View>
    </SafeAreaView>
  );
}

function GraphRoute() {
  const theme = useTheme();
  return (
    <SafeAreaView style={[styles.container]}>
      <Appbar.Header style={{ backgroundColor: theme.colors.elevation.level2 }}>
        <Appbar.Content title="Graph" />
      </Appbar.Header>
      <Text>Graph</Text>
    </SafeAreaView>
  );
}

function SettingsRoute() {
  const theme = useTheme();
  return (
    <SafeAreaView style={[styles.container]}>
      <Appbar.Header style={{ backgroundColor: theme.colors.elevation.level2 }}>
        <Appbar.Content title="Settings" />
      </Appbar.Header>
      <Text>Settings</Text>
    </SafeAreaView>
  );
}

export default function App() {
  // react native paper theme
  const colorScheme = "light"; // useColorScheme() || "dark
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
    { key: "graph", title: "Graph", focusedIcon: "chart-areaspline" },
    {
      key: "settings",
      title: "Settings",
      focusedIcon: "cog",
      unfocusedIcon: "cog-outline",
    },
  ]);
  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    graph: GraphRoute,
    settings: SettingsRoute,
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sub_container: {
    paddingLeft: 15,
    paddingRight: 15,
    gap: 20,
  },
});
