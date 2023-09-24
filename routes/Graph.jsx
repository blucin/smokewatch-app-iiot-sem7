import React from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";
import { Appbar, useTheme, Text } from "react-native-paper";
import { LineChart } from "react-native-gifted-charts";

export default function Graph() {
	const theme = useTheme();
	const ptData = [
		{ value: 160, date: "1 Sep 2023" },
		{ value: 180, date: "2 Sep 2023" },
		{ value: 190, date: "3 Sep 2023" },
		{ value: 180, date: "4 Sep 2023" },
		{ value: 140, date: "5 Sep 2023" },
		{ value: 145, date: "6 Sep 2023" },
		{ value: 160, date: "7 Sep 2023" },
		{ value: 200, date: "8 Sep 2023" },

		{ value: 220, date: "9 Sep 2023" },
		{
			value: 240,
			date: "10 Sep 2023",
			label: "10 Sep",
			labelTextStyle: { color: theme.colors.secondary, width: 60 },
		},
		{ value: 280, date: "11 Sep 2023" },
		{ value: 260, date: "12 Sep 2023" },
		{ value: 340, date: "13 Sep 2023" },
		{ value: 385, date: "14 Sep 2023" },
		{ value: 280, date: "15 Sep 2023" },
		{ value: 390, date: "16 Sep 2023" },
		{ value: 370, date: "17 Sep 2023" },
		{ value: 285, date: "18 Sep 2023" },
		{ value: 295, date: "19 Sep 2023" },
		{
			value: 300,
			date: "20 Sep 2023",
			label: "20 Sep",
			labelTextStyle: { color: theme.colors.secondary, width: 60 },
		},
		{ value: 280, date: "21 Sep 2023" },
		{ value: 295, date: "22 Sep 2023" },
		{ value: 260, date: "23 Sep 2023" },
		{ value: 255, date: "24 Sep 2023" },

		{ value: 190, date: "25 Sep 2023" },
		{ value: 220, date: "26 Sep 2023" },
		{ value: 205, date: "27 Sep 2023" },
		{ value: 230, date: "28 Sep 2023" },
		{ value: 210, date: "29 Sep 2023" },
		{
			value: 200,
			date: "30 Sep 2023",
			label: "30 Sep",
			labelTextStyle: { color: theme.colors.secondary, width: 60 },
		},
		{ value: 240, date: "1 May 2023" },
		{ value: 250, date: "2 May 2023" },
		{ value: 280, date: "3 May 2023" },
		{ value: 250, date: "4 May 2023" },
		{ value: 210, date: "5 May 2023" },
	];
	return (
		<SafeAreaView style={[styles.container]}>
			<Appbar.Header
				style={{ backgroundColor: theme.colors.elevation.level2 }}
			>
				<Appbar.Content title="Graph" />
			</Appbar.Header>
			<View style={[styles.sub_container]}>
				<LineChart
					areaChart
					data={ptData}
					width={300}
					hideDataPoints
					spacing={10}
					color={theme.colors.secondary}
					thickness={2}
					startFillColor={hexToRGBA(theme.colors.primary, 0.3)}
					endFillColor={hexToRGBA(theme.colors.primary, 0.01)}
					startOpacity={0.9}
					endOpacity={0.2}
					initialSpacing={0}
					noOfSections={6}
					stepHeight={50}
					height={300}
					maxValue={500}
					yAxisColor={theme.colors.secondary}
					yAxisThickness={0}
					rulesColor={theme.colors.secondary}
					yAxisTextStyle={{ color: theme.colors.secondary }}
					yAxisLabelSuffix=" ppm"
					yAxisTextNumberOfLines={2}
					xAxisColor={theme.colors.secondary}
					xAxisIndicesColor={theme.colors.secondary}
					xAxisTextNumberOfLines={1}
					pointerConfig={{
						pointerStripHeight: 160,
						pointerStripColor: theme.colors.secondary,
						pointerStripWidth: 2,
						pointerColor: theme.colors.secondary,
						radius: 6,
						pointerLabelWidth: 100,
						pointerLabelHeight: 90,
						activatePointersOnLongPress: true,
						autoAdjustPointerLabelPosition: true,
						pointerLabelComponent: (items) => {
							return (
								<View
									style={{
										height: 90,
										width: 100,
										justifyContent: "center",
									}}
								>
									<Text
										style={{
											color: theme.colors.secondary,
											fontSize: 14,
											marginBottom: 6,
											textAlign: "center",
										}}
									>
										{items[0].date}
									</Text>

									<View
										style={{
											paddingHorizontal: 14,
											paddingVertical: 6,
											borderRadius: 16,
											backgroundColor:
												theme.colors.secondaryContainer,
										}}
									>
										<Text
											style={{
												fontWeight: "bold",
												textAlign: "center",
												color: theme.colors.secondary,
											}}
										>
											{items[0].value + " ppm"}
										</Text>
									</View>
								</View>
							);
						},
					}}
				/>
			</View>
		</SafeAreaView>
	);
}

function hexToRGBA(hex, alpha) {
	var r = parseInt(hex.slice(1, 3), 16),
		g = parseInt(hex.slice(3, 5), 16),
		b = parseInt(hex.slice(5, 7), 16);

	if (alpha) {
		return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
	} else {
		return "rgb(" + r + ", " + g + ", " + b + ")";
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	sub_container: {
		gap: 20,
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
		padding: 20,
	},
});
