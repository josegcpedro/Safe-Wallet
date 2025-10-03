import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import { FIREBASE_AUTH, FIREBASE_DB } from "@/src/firebase/FireBaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore"
import { useEffect, useState } from "react";

export default function Params() {
    const [currentUid, setCurrentUid] = useState<string | null>(null);
    const [userData, setUserData] = useState<any>(null)
    const [loading, setLoading] = useState<boolean>(true)

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
                <View>
                    <Text>Votre salaire est de : {userData && userData.salary ? userData.salary : "Chargement..."}.-</Text>
                </View>
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

    card: {
        backgroundColor: "#fff",
        alignItems:"center",
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
})

