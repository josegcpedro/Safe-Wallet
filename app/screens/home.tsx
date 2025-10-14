
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, View } from "react-native";
import Accueil from "../tabs/accueil";
import Params from "../tabs/params";
import { Ionicons } from '@expo/vector-icons';
import { useState } from "react";


export default function Home() {
    const Tab = createBottomTabNavigator();
    const [showCard, setShowCard] = useState<boolean>(false);

    return (
        <View style={styles.container}>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName: keyof typeof Ionicons.glyphMap;

                        if (route.name === 'Accueil') {
                            iconName = focused ? 'home' : 'home-outline';
                        } else if (route.name === 'Paramètres') {
                            iconName = focused ? 'settings' : 'settings-outline';
                        }

                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: '#007AFF',
                    tabBarInactiveTintColor: '#555',
                })}

            >

                <Tab.Screen name="Accueil">
                    {() => <Accueil setShowCard={setShowCard} showCard={showCard}/>}
                </Tab.Screen>

                <Tab.Screen name="Paramètres" component={Params} />
            </Tab.Navigator>
        </View>

    );

}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
    },
});
