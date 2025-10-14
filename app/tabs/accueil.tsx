import { Text, View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { FIREBASE_AUTH, FIREBASE_DB } from "@/src/firebase/FireBaseConfig";
import { doc, getDoc, getDocs, collection, } from "firebase/firestore"
import DropDownPicker from 'react-native-dropdown-picker';
import React, { useCallback, useEffect, useState } from "react";
import { router, useFocusEffect } from "expo-router";

interface AccueilProps {
    setShowCard: React.Dispatch<React.SetStateAction<boolean>>;
    showCard: boolean;
}


export default function Accueil({ setShowCard, showCard }: AccueilProps) {
    const [currentUid, setCurrentUid] = useState<string | null>(null);
    const [userData, setUserData] = useState<any>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [newExpenseTitle, setNewExpenseTitle] = useState("");
    const [newExpenseAmount, setNewExpenseAmount] = useState("");
    const [tags, setTags] = useState<any[]>([]);
    const [selectedTag, setSelectedTag] = useState("");
    const [open, setOpen] = useState(false); // ouvre/ferme le dropdown
    const [value, setValue] = useState<string | null>(null); // tag sélectionné
    const [items, setItems] = useState<any[]>([]); // tous les tags


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
                    setUserData(docSnap.data());
                } else {
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


    useFocusEffect(
        useCallback(() => {
            return () => {
                setShowCard(false);
            };
        }, [])
    );

    useEffect(() => {
        if (!currentUid) return;
        if (!showCard) return;

        const fetchTags = async () => {
            try {
                const tagsRef = collection(FIREBASE_DB, "users", currentUid, "tags");
                const querySnapshot = await getDocs(tagsRef);

                const allTags = querySnapshot.docs.map((doc: any) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setItems(allTags.map(tag => ({
                    label: tag.name,
                    value: tag.id,
                })));

                setTags(allTags);
            } catch (error) {
                console.error("Erreur en récupérant les tags", error);
            }
        };

        fetchTags();
    }, [currentUid, showCard]);


    return (
        <View style={styles.container}>
            {showCard ? (
                <View style={styles.addExpensesCard}>
                    <Text style={styles.cardTitle}>Ajouter une nouvelle dépense</Text>

                    <TextInput
                        value={newExpenseTitle}
                        style={styles.input}
                        placeholder="Nom de la dépense"
                        placeholderTextColor="#888"
                        onChangeText={(text) => setNewExpenseTitle(text)}
                    />
                    <TextInput
                        value={newExpenseAmount}
                        style={styles.input}
                        placeholder="Montant"
                        placeholderTextColor="#888"
                        keyboardType="numeric"
                        onChangeText={(text) => setNewExpenseAmount(text)}
                    />
                    <DropDownPicker
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                        placeholder="Choisir un tag"
                        containerStyle={{ marginTop: 10, width: "100%" }}
                        textStyle={{ color: '#00000097' }} // couleur rouge
                        style={styles.dropdown}
                    />

                    <TouchableOpacity style={styles.submitButton}>
                        <Text style={styles.submitText}>Ajouter</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.closeButton} onPress={() => setShowCard(false)}>
                        <Text style={styles.closeText}>✕</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <>
                    <View style={styles.card}>
                        <View style={styles.amoundAndData}>
                            <Text style={styles.amountColor}>
                                Solde : {userData?.sold ?? "Chargement..."} .-
                            </Text>
                            <Text style={styles.dataColor}>{formattedDate}</Text>
                        </View>
                        <Text style={styles.amountInfos}>Depensé aujourd'hui :</Text>
                        <Text style={styles.amountInfos}>Dernier Achat :</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.addExprenses}
                        onPress={() => setShowCard(true)}
                    >
                        <Text style={{ color: "#fff", fontSize: 40 }}>+</Text>
                    </TouchableOpacity>
                </>
            )}
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
        padding: 20,
        borderRadius: 20,
        marginBottom: 20,
        width: "90%",
        maxWidth: 320,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 5,
        height: 120,
    },
    amountInfos: {
        marginTop: 6,
        color: "#555",
        fontSize: 12,
    },
    amoundAndData: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    dataColor: {
        color: "#888",
        fontSize: 12,
        marginTop: 2,
    },
    amountColor: {
        color: "#007bffa7",
        fontWeight: "bold",
        fontSize: 16,
    },
    addExprenses: {
        position: "absolute",
        bottom: 30,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#007bffa7",
        borderRadius: 50,
        width: 65,
        height: 65,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    addExpensesCard: {
        width: "90%",
        maxWidth: 320,
        backgroundColor: "#fff",
        position: "absolute",
        top: 150,
        borderRadius: 20,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 15,
        elevation: 10,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 15,
        color: "#007bffa7",
        textAlign: "center",
    },
    input: {
        marginVertical: 10,
        height: 45,
        width: "100%",
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 15,
        backgroundColor: "#f9f9f9",
        borderColor: "#ccc",
        color: "#333",
        fontSize: 14,
    },
    submitButton: {
        marginTop: 20,
        backgroundColor: "#007bffa7",
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: "center",
    },
    submitText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
    closeButton: {
        position: "absolute",
        top: 10,
        right: 10,
        backgroundColor: "#eee",
        borderRadius: 15,
        padding: 5,
    },
    closeText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#555",
    },
    dropdown: {
        borderColor: "#55555535",
        backgroundColor: "#8888880c",
        justifyContent: "center",
    }

});
