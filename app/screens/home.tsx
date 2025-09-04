import { View, Text, StyleSheet } from "react-native";
import { FIREBASE_AUTH } from "@/app/firebase/FireBaseConfig";

export default function Home() {
    const user = FIREBASE_AUTH.currentUser;

    return (
        <View style={styles.container}>
            <Text style={styles.welcome}>Salut {user?.displayName} !</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "white"
    },
    welcome: {
        fontSize: 24,
        paddingTop: 70,
        paddingLeft: 10
    },
});
