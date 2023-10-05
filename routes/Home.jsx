import React from "react";
import {
	Text,
	Card,
	Divider,
	Button,
} from "react-native-paper";
import { Appbar, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaView, View, StyleSheet, Platform, Linking } from "react-native";

// firebase 
import { FIREBASE_AUTH, FIREBASE_REALTIME_DB } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { set, ref, onValue } from "firebase/database";

// push notification
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// Can use this function below or use Expo's Push Notification Tool from: https://expo.dev/notifications
async function sendPushNotification(expoPushToken, ppm) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Smoke Detected!',
    body: `Smoke detected at ${ppm} PPM`,
    data: { ppm },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId,
    });
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

// write led state 
function writeLedState(led) {
	const userId = FIREBASE_AUTH.currentUser.uid;
	const ledRef = ref(FIREBASE_REALTIME_DB, `UsersData/${userId}/led`);
	// write led state to firebase
	set(ledRef, led);
}

export default function Home(props) {
  const theme = useTheme();
	const [ppm, setppm] = React.useState();
	const threshold = 350;
	const textColor = !ppm ? theme.colors.onSurface : (ppm < threshold ? theme.colors.onSurface : theme.colors.error);
	const iconColor = !ppm ? theme.colors.primary : (ppm < threshold ? theme.colors.primary : theme.colors.error);

	// debug led 
	const [led, setLed] = React.useState(false);

	// notification
	const [expoPushToken, setExpoPushToken] = React.useState('');
  const [notification, setNotification] = React.useState(false);
  const notificationListener = React.useRef();
  const responseListener = React.useRef();

	React.useEffect(() => {
		registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

		responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

		const sendNotification = async (ppm) => {
			await sendPushNotification(expoPushToken, ppm);
		}

		signInWithEmailAndPassword(FIREBASE_AUTH, "wokwi@wokwi.com" , "password1234")
				.then((userCredential) => {
						const userId = userCredential.user.uid;
						// read ppm
						const ppmRef = ref(FIREBASE_REALTIME_DB, `UsersData/${userId}/smokeReadings`);
						onValue(ppmRef, (snapshot) => {
								const data = snapshot.val();
								console.log(data);
								setppm(data);
								if (data > threshold) {
									sendNotification(data);
								}
						});
				})
				.catch((error) => {
						console.error(error);
						setppm(undefined);
				});

		return () => {
			Notifications.removeNotificationSubscription(notificationListener.current);
			Notifications.removeNotificationSubscription(responseListener.current);
		}
	}, []);

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
							G H Patel College Of Engineering & Technology
							Vallabh Vidya Nagar, Anand
						</Text>
					</Card.Content>
				</Card>
				<Button icon="alert" mode="contained-tonal" onPress={() => {
						Linking.openURL(`tel:${"XXXXXXXXXX"}`);
				}}>
					Call Fire Department
				</Button>
				<Button
					icon={led ? "alarm-light-outline" : "alarm-light"}
					mode={led ? "outlined" : "contained-tonal"}
					onPress={() => {
						setLed(!led);
						writeLedState(!led);
					}}
				>
					{"Debug Inbuilt LED" + (led ? " : Off" : ": On")}
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