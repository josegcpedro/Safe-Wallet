import { Text, View, StyleSheet, ActivityIndicator, TouchableOpacity, Alert } from "react-native";
import { FIREBASE_AUTH, FIREBASE_DB } from "@/src/firebase/FireBaseConfig";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
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

    const fetchData = async () => {
        if (!currentUid) return;
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

    useEffect(() => {
        fetchData();
    }, [currentUid]);

    if (loading) {
        return (
            <View style={[styles.container, { justifyContent: "center" }]}>
                <ActivityIndicator size="large" color="#007AFF" />
            </View>
        );
    }

    const changeMensualSalary = async (currentUid: string) => {
        Alert.prompt(
            "Quel est le nouveau salaire?",
            "Entrez le nouveau salaire",
            async (salary) => {
                if (!salary) {
                    Alert.alert("Annulé", "Aucun salaire saisi");
                    return;
                }

                const salaryNumber = Number(salary);
                if (isNaN(salaryNumber)) {
                    Alert.alert("Erreur", "Veuillez entrer un nombre valide");
                    return;
                }

                try {
                    const userDocRef = doc(FIREBASE_DB, "users", currentUid);
                    await updateDoc(userDocRef, { salary: salaryNumber });
                    Alert.alert("Succès", "Le salaire a été mis à jour !");
                    await fetchData()
                } catch (error) {
                    console.error("Erreur lors de la mise à jour :", error);
                    Alert.alert("Erreur", "Impossible de mettre à jour le salaire");
                }
            },
            "plain-text"
        );
    };

    const addTag = async (currentUid: string) => {
        Alert.prompt(
            "Quel étiquette voulez-vous ajouter?",
            "Entrez la nouvelle étiquette",
            async (tag) => {
                if (!tag) {
                    Alert.alert("Annulé", "Aucune étiquette sasie");
                    return
                }
                try {
                    const tagDocRef = doc(FIREBASE_DB, "users", currentUid, "tags", tag);
                    await setDoc(tagDocRef, { name: tag }, { merge: true });
                    Alert.alert("Succès", "Le salaire a été mis a jour!");
                } catch (error) {
                    console.error(error);
                    Alert.alert("Erreur", "Veuillez essayer plus tard");
                }
            }
        )
    }



    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.mensualSalary}>
                    Salaire mensuel: {userData?.salary ?? "Pas de données"}.-
                </Text>
            </View>
            <TouchableOpacity
                style={styles.changeMensualSalaryButton}
                onPress={() => {
                    if (currentUid) {
                        changeMensualSalary(currentUid)
                    }
                }}
            >
                <Text style={{ color: "#ffffffff", }}>Modifier le salaire</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.addTagStyle}
                onPress={() => {
                    if (currentUid) {
                        addTag(currentUid)
                    }
                }}
            >
                <Text style={{ color: "#ffffffff", }}>Ajouter une étiquette</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.logoutButton}
                onPress={() => {
                    FIREBASE_AUTH.signOut();
                    router.push("/");
                }}
            >
                <Text style={{ color: "#ffffffff", }}>Quitter</Text>
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
        backgroundColor: "#f84141ae",
        width: 150,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        position: "absolute",
        bottom: 30,
    },
    changeMensualSalaryButton: {
        backgroundColor: "#1ed254ae",
        width: 200,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        position: "absolute",
        top: 200,
    },
    addTagStyle: {
        backgroundColor: "#1e57d2ae",
        width: 200,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        position: "absolute",
        bottom: 100
    }
});
