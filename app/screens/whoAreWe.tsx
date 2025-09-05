import { router } from "expo-router";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function WhoAreWe() {
    return (
        <ScrollView style={styles.background} contentContainerStyle={styles.container}>
            <Text style={styles.header}>Qui sommes-nous ?</Text>

            <Text style={styles.intro}>
                Safe Wallet est une application sécurisée et intuitive, conçue pour vous aider à gérer vos finances personnelles et protéger vos données.
            </Text>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>💰 Gestion des finances</Text>
                <Text style={styles.cardText}>Suivez vos revenus, dépenses et soldes facilement.</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>📜 Historique des transactions</Text>
                <Text style={styles.cardText}>Consultez vos transactions passées et organisez-les simplement.</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>🔒 Sécurité renforcée</Text>
                <Text style={styles.cardText}>Vos informations sensibles sont protégées par chiffrement et authentification sécurisée.</Text>
            </View>
            <View style={styles.card}>
                <Text style={styles.cardTitle}>🔒 Sécurité renforcée</Text>
                <Text style={styles.cardText}>Vos informations sensibles sont protégées par chiffrement et authentification sécurisée.</Text>
            </View>
            <View style={styles.card}>
                <Text style={styles.cardTitle}>🔒 Sécurité renforcée</Text>
                <Text style={styles.cardText}>Vos informations sensibles sont protégées par chiffrement et authentification sécurisée.</Text>
            </View>
            <View style={styles.card}>
                <Text style={styles.cardTitle}>🔒 Sécurité renforcée</Text>
                <Text style={styles.cardText}>Vos informations sensibles sont protégées par chiffrement et authentification sécurisée.</Text>
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
        marginTop: 100,
        padding: 20,
        alignItems: "center",
    },
    header: {
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
        color: "#333",
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
        color: "#333",
    },
    cardText: {
        fontSize: 15,
        color: "#555",
        lineHeight: 20,
    },
    returnButton: {
        fontSize:25,
        color:"#555",
        marginBottom:50,
    }

});
