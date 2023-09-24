import React from "react";
import {
	Text,
	Card,
	Divider,
	Button,
} from "react-native-paper";
import { Appbar, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaView, View, StyleSheet } from "react-native";

export default function Home() {
  const theme = useTheme();
	const [ppm, setppm] = React.useState();
	const threshold = 350;
	const textColor = !ppm ? theme.colors.onSurface : (ppm < threshold ? theme.colors.onSurface : theme.colors.error);
	const iconColor = !ppm ? theme.colors.primary : (ppm < threshold ? theme.colors.primary : theme.colors.error);

	return (
		<SafeAreaView style={[styles.container]}>
			<Appbar.Header
				style={{ backgroundColor: theme.colors.elevation.level2 }}
			>
				<Appbar.Content title="Home" />
			</Appbar.Header>
			<View style={[styles.sub_container]}>
				<View style={{ alignItems: "center" }}>
					<Icon
						name={
							!ppm ? "smoke-detector-variant-off" :
							(ppm < threshold
								? "smoke-detector-variant"
								: "smoke-detector-variant-alert")
						}
						size={210}
						color={iconColor}
					/>
				</View>
				{/* TODO: Wrap content below icon in a scrollable */}
				<Card
					style={{
						backgroundColor:
							!ppm ? theme.colors.elevation.level1 :
							(ppm < threshold
								? theme.colors.elevation.level1
								: theme.colors.errorContainer),
					}}
				>
					<View style={{ flexDirection: "row", padding: 10 }}>
						<View
							style={{
								alignItems: "left",
								flex: 1,
								paddingLeft: 10,
							}}
						>
							<Icon
								name="smoke"
								size={80}
								color={iconColor}
							/>
						</View>
						<View style={{ flex: 2, justifyContent: "center" }}>
							<Text
								variant="displaySmall"
								style={{
									color: textColor
								}}
							>
								Smoke
							</Text>
							<Text
								variant="titleLarge"
								style={{
									color: textColor
								}}
							>
								{!ppm ? "Offline" : `${ppm} PPM`}
							</Text>
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
							<Icon
								name="map-marker"
								size={40}
								color={theme.colors.primary}
							/>
							<Text variant="displaySmall">Location:</Text>
						</View>
						<Divider
							style={{
								padding: 1,
								marginBottom: 10,
								backgroundColor: theme.colors.primary,
							}}
						/>
						<Text variant="titleMedium" style={{ paddingLeft: 10 }}>
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit, sed do eiusmod
						</Text>
					</Card.Content>
				</Card>
				<Button icon="alert" mode="contained-tonal" onPress={() => {}}>
					Call Fire Department
				</Button>
				<Button
					icon="lightbulb-on"
					mode="contained-tonal"
					onPress={() => {}}
				>
					Debug Inbuilt LED
				</Button>
			</View>
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