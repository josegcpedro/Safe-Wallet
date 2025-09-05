import { FIREBASE_AUTH } from "@/app/firebase/FireBaseConfig";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View } from "react-native";
import Accueil from "../tabs/accueil";

import Params from "../tabs/params";

export default function Home() {
    const user = FIREBASE_AUTH.currentUser;
    const Tab = createBottomTabNavigator();

    return (
        <View style={styles.container}>
            <Text style={styles.welcome}>Salut {user?.displayName} !</Text>

            <Tab.Navigator screenOptions={{ headerShown: false }}>
                <Tab.Screen name="Accueil" component={Accueil} />
                <Tab.Screen name="Params" component={Params} />
            </Tab.Navigator>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "#f3eeeaff"
    },
    welcome: {
        fontSize: 24,
        paddingTop: 70,
        paddingLeft: 10
    },
});
