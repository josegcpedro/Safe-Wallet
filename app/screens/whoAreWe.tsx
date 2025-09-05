import { View, Text, StyleSheet, ScrollView } from "react-native";
import { router } from "expo-router";

export default function WhoAreWe() {
    return (
        <ScrollView style={styles.background} contentContainerStyle={styles.container}>
            <Text style={styles.header}>Qui sommes-nous ?</Text>

            <Text style={styles.intro}>
                Safe Wallet est une application intuitive et sécurisée qui vous aide à gérer facilement vos finances personnelles tout en protégeant vos données.
            </Text>


            <View style={styles.card}>
                <Text style={styles.cardTitle}>🚪 Connexion</Text>
                <Text style={styles.cardText}>Créez un compte ou connectez-vous facilement.</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>📊 Graphiques</Text>
                <Text style={styles.cardText}>Consultez et créez des graphiques de manière simple et intuitive.</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>💰 Dépenses</Text>
                <Text style={styles.cardText}>Ajoutez ou supprimez vos dépenses mensuelles.</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>🗓️ Cartes mensuelles</Text>
                <Text style={styles.cardText}>Créez des cartes mensuelles pour contrôler vos dépenses du mois.</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>🛠️ Fonctionnalités futures</Text>
                <Text style={styles.cardText}>- Connexion biométrique (Face ID)</Text>
                <Text style={styles.cardText}>- Automatisation des cartes mensuelles</Text>
            </View>

            <Text style={styles.returnButton} onPress={() => router.push("/")}>
                Retour
            </Text>
        </ScrollView>

    );
}

const styles = StyleSheet.create({
    background: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        backgroundColor: "#f3eeeaff",
    },
    container: {
        marginTop: 80,
        padding: 20,
        alignItems: "center",
    },
    header: {
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
        color: "#555",
    },
    intro: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 30,
        lineHeight: 22,
        color: "#555",
    },
    card: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 15,
        marginBottom: 20,
        width: "100%",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
        color: "#555",
    },
    cardText: {
        fontSize: 15,
        color: "#555",
        lineHeight: 20,
    },
    returnButton: {
        fontSize: 25,
        color: "#555",
        paddingTop: 20,
        marginBottom: 50,
    }

});
