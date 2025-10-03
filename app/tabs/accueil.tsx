import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import { FIREBASE_AUTH, FIREBASE_DB } from "@/src/firebase/FireBaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore"
import { useEffect, useState } from "react";

export default function Params() {
    const [currentUid, setCurrentUid] = useState<string | null>(null);
    const [userData, setUserData] = useState<any>(null)
    const [loading, setLoading] = useState<boolean>(true)

    const today = new Date();
    const formattedDate = today.toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

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
                    const data = docSnap.data();
                    setUserData(data);
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

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.amoundAndData}>
                    <Text style={styles.amountColor}>Solde : {userData && userData.sold ? userData.sold : "Chargement..."}.-</Text>
                    <Text style={styles.dataColor} >{formattedDate}</Text>
                </View>
                <Text style={styles.amountInfos}>Depensé aujourd'hui :</Text>
                <Text style={styles.amountInfos}>Dernier Achat :</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f3eeeaff",
        ...StyleSheet.absoluteFillObject,
        paddingTop: 100,
        alignItems: "center",
    },
    helloText: {
        fontSize: 20,
        marginLeft: 10,
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
        height: 90,
        maxWidth: 300,
    },
    amountInfos: {
        marginTop: 6,
        color: "#555555",
        fontSize: 10
    },
    amoundAndData: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    dataColor: {
        color: "#545353ff",
        fontSize: 10,
        marginTop: 2
    },
    amountColor: {
        color: "#007AFF",
    }
})