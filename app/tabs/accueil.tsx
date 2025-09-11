import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import { FIREBASE_AUTH, FIREBASE_DB } from "@/src/firebase/FireBaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore"
import { useEffect, useState } from "react";

export default function Accueil() {
    const [currentUid, setCurrentUid] = useState<string | null>(null);
    const [userData, setUserData] = useState<any>(null)
    const [loading, setLoading] = useState<boolean>(true)


    useEffect(() => {
        const unsubscribe = FIREBASE_AUTH.onAuthStateChanged(user => { // quand un changement ce passe ça verifie si le user existe, si oui ça définit le currentUid comme user.uid
            if (user) {
                setCurrentUid(user.uid);
            } else {
                setCurrentUid(null);
                setLoading(false);
            }
        });
        return unsubscribe; // arrête de listener pour éviter les fuites de mémoire
    }, []);

    useEffect(() => {
        if (!currentUid) return;

        const fetchData = async () => {
            setLoading(true); // démarre le loader
            try {
                const docRef = doc(FIREBASE_DB, "users", currentUid); // essaye de récurer les données
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) { // si ya des données ça récupére
                    const data = docSnap.data();
                    console.log("Données collecté");
                    setUserData(data);
                } else {
                    console.log("Pas encore de données pour cet utilisateur.");
                    setUserData(null);
                }
            } catch (error) {
                console.error("Erreur en récupérant les données :", error);
            } finally {
                setLoading(false); // arrête le loader quoi qu'il arrive
            }
        };
        fetchData();
    }, [currentUid]);

    return (
        <View style={styles.container}>
            <Text>
                <Text>Nom  : {userData?.displayName ?? "Non renseigné"}</Text>


                <Text>Salary : {userData?.salary ?? "Non renseigné"}</Text>
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f3eeeaff",
        ...StyleSheet.absoluteFillObject,
        paddingTop: 100,
    }
})