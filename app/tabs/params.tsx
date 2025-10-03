import { Text, View, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import { FIREBASE_AUTH, FIREBASE_DB } from "@/src/firebase/FireBaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";


export default function Params() {
    const [currentUid, setCurrentUid] = useState<string | null>(null);
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();
    useEffect(() => {
        const unsubscribe = FIREBASE_AUTH.onAuthStateChanged(user => {
            if (user) {
                setCurrentUid(user.uid);
            } else {
                setCurrentUid(null);
                setLoading(false);
            }
        });
        return unsubscribe;
    }, []);

    useEffect(() => {
        if (!currentUid) return;

        const fetchData = async () => {
            setLoading(true);
            try {
                const docRef = doc(FIREBASE_DB, "users", currentUid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setUserData(docSnap.data());
                } else {
                    console.log("Pas encore de données pour cet utilisateur.");
                    setUserData(null);
                }
            } catch (error) {
                console.error("Erreur en récupérant les données :", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [currentUid]);

    if (loading) {
        return (
            <View style={[styles.container, { justifyContent: "center" }]}>
                <ActivityIndicator size="large" color="#007AFF" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.mensualSalary}>
                    Salaire mensuel: {userData?.salary ?? "Pas de données"}.-
                </Text>
            </View>

            <TouchableOpacity
                style={styles.logoutButton}
                onPress={() => {
                    FIREBASE_AUTH.signOut();
                    router.push("/");
                }}
            >
                <Text style={{ color: "#007AFF", fontWeight: "bold" }}>Quitter</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f3eeeaff",
        ...StyleSheet.absoluteFillObject,
        paddingTop: 100,
        alignItems: "center",
    },

    card: {
        backgroundColor: "#fff",
        alignItems: "center",
        borderRadius: 15,
        marginBottom: 20,
        width: "100%",
        maxWidth: 300,
        height: 50,
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    mensualSalary: {
        color: "#007AFF",
    },
    logoutButton: {
        backgroundColor: "#fff",
        width: 150,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
});
