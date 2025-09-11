import { Text, View } from "react-native";
import { FIREBASE_AUTH } from "@/src/firebase/FireBaseConfig";

export default function Accueil() {
    const user = FIREBASE_AUTH.currentUser;

    return (
        <View>
            <Text>
                Salut {user?.displayName}
            </Text>
        </View>
    )
}