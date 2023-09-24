import React from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";
import { Appbar, useTheme, Text } from "react-native-paper";

export default function Graph() {
  const theme = useTheme();
	return (
		<SafeAreaView style={[styles.container]}>
			<Appbar.Header
				style={{ backgroundColor: theme.colors.elevation.level2 }}
			>
				<Appbar.Content title="Graph" />
			</Appbar.Header>
			<Text>Graph</Text>
		</SafeAreaView>
	);
}

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