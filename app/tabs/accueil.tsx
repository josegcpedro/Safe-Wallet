import { Text, View, StyleSheet } from "react-native";
import { FIREBASE_AUTH } from "@/src/firebase/FireBaseConfig";

export default function Accueil() {
    const user = FIREBASE_AUTH.currentUser;

    return (
        <View style={styles.container}>
            <Text style={styles.helloUser}>
                Salut {user?.displayName} !
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f3eeeaff",
        ...StyleSheet.absoluteFillObject,
        paddingTop: 100,
    },
    helloUser: {
        fontSize:20,
        paddingLeft:10,
    }
})