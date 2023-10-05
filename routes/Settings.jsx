import React from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";
import { Appbar, useTheme, Text } from "react-native-paper";
import { TextInput, FAB } from "react-native-paper";
import PropTypes from 'prop-types';

export default function Settings(props) {
	const theme = useTheme();
	const [email, setEmail] = React.useState(props.email);
	const [password, setPassword] = React.useState(props.password);

	const handlePress = () => {
		props.setEmail(email);
		props.setPassword(password);
	};

	return (
		<SafeAreaView style={[styles.container]}>
			<Appbar.Header
				style={{ backgroundColor: theme.colors.elevation.level2 }}
			>
				<Appbar.Content title="Settings" />
			</Appbar.Header>
			<View style={[styles.sub_container]}>
				<Text
					variant="headlineSmall"
					style={{ color: theme.colors.primary }}
				>
					Firebase Auth Cred
				</Text>
				<TextInput
					label="Email"
					value={email}
					onChangeText={(email) => setEmail(email)}
				/>
				<TextInput
					label="Password"
					value={password}
					onChangeText={(password) => setPassword(password)}
				/>
			</View>
			<FAB
				icon="content-save-outline"
				style={styles.fab}
				onPress={handlePress}
			/>
		</SafeAreaView>
	);
}

Settings.prototype = {
	email: PropTypes.string,
	password: PropTypes.string,
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	sub_container: {
		flex: 1,
		justifyContent: "center",
		padding: 15,
		gap: 20,
	},
	fab: {
    position: 'absolute',
    margin: 30,
    right: 0,
    bottom: 0,
  },
});
