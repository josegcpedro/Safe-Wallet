import { View, Text, StyleSheet } from "react-native";
import { FIREBASE_AUTH } from "@/app/firebase/FireBaseConfig";

export default function Home() {
    const user = FIREBASE_AUTH.currentUser;

    return (
        <View>
            <Text style={styles.welcome}>Salut {user?.displayName} !</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    welcome: {
        fontSize: 24,
        margin: 20,
    },
});
