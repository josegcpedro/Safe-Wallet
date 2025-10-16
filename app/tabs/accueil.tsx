import { Text, View, StyleSheet, TouchableOpacity, TextInput, Alert } from "react-native";
import { FIREBASE_AUTH, FIREBASE_DB } from "@/src/firebase/FireBaseConfig";
import { doc, getDoc, setDoc, getDocs, collection, updateDoc, serverTimestamp } from "firebase/firestore"
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
    const [newExpenseAmount, setNewExpenseAmount] = useState(0);
    const [tags, setTags] = useState<any[]>([]);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<string | null>(null);
    const [items, setItems] = useState<any[]>([]);
    const [expensesData, setExpensesData] = useState<any[]>([]);
    const [sold, setSold] = useState<number>(0);


    let total = 0;
    const today = new Date();
    const formattedDate = today.toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    useEffect(() => {
        const unsubscribe = FIREBASE_AUTH.onAuthStateChanged((user: { uid: React.SetStateAction<string | null>; }) => {
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
                setUserData(null);
            }
        } catch (error) {
            console.error("Erreur en récupérant les données :", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchExpensesData = async () => {
        if (!currentUid) return;
        setLoading(true);
        try {
            const expensesRef = collection(FIREBASE_DB, "users", currentUid, "expenses");
            const querySnapshot = await getDocs(expensesRef);

            const data = querySnapshot.docs.map((doc: { id: any; data: () => any; }) => ({
                id: doc.id,
                ...doc.data(),
            }));

            setExpensesData(data);
        } catch (error) {
            console.error("Erreur lors de la récupération des dépenses:", error);
            setExpensesData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!currentUid) return;
        fetchExpensesData();
        fetchData();
    }, [currentUid]);

    useFocusEffect(
        useCallback(() => {
            return () => {
                setOpen(false);
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
                setItems(allTags.map((tag: { name: any; id: any; }) => ({
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


    const getLastExpense = (expensesData: any[]) => {
        if (expensesData.length === 0) return null;

        const lastExpense = expensesData.reduce((latest, current) => {
            const currentDate = current.createdAt?.toDate ? current.createdAt.toDate() : new Date(current.createdAt);
            const latestDate = latest.createdAt?.toDate ? latest.createdAt.toDate() : new Date(latest.createdAt)

            return currentDate > latestDate ? current : latest;
        })
        return lastExpense
    };

    const getDayExpenses = (expensesData: any[]) => {
        if (expensesData.length === 0) return null;


        const today = new Date();

        for (let expense of expensesData) {
            const date = expense.createdAt?.toDate ? expense.createdAt?.toDate() : new Date(expense.createdAt);

            if (date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()) {
                total += expense.amount
            }
        }
        return total;
    };

    const addExpenses = async () => {
        if (!newExpenseTitle || !newExpenseAmount || !value) {
            alert("Veuillez tout remplir !");
            return;
        }

        try {
            const expenseRef = doc(FIREBASE_DB, "users", currentUid, "expenses", newExpenseTitle);
            await setDoc(expenseRef, {
                expenseTitle: newExpenseTitle,
                amount: newExpenseAmount,
                tag: value,
                createdAt: serverTimestamp()
            }, { merge: true });

            const userRef = doc(FIREBASE_DB, "users", currentUid);
            const newSold = (userData?.sold ?? 0) - Number(newExpenseAmount);
            await updateDoc(userRef, { sold: newSold });

            setSold(newSold);

            alert("Dépense ajoutée avec succès !");
            setNewExpenseTitle("");
            setNewExpenseAmount(0);
            setShowCard(false);
            await fetchExpensesData();
            await fetchData();
        } catch (error) {
            console.error(error);
            Alert.alert("Erreur");
        }
    };


    const lastExpense = getLastExpense(expensesData);

    useEffect(() => {
        fetchData();
    }, [currentUid]);



    const modifySold = async () => {
        Alert.prompt(
            "Quel est votre solde?",
            "Entrez le nouveau solde",
            async (sold) => {
                if (!sold) {
                    Alert.alert("Annulé", "Aucun salaire saisi");
                    return;
                }

                const soldNumber = Number(sold);
                if (isNaN(soldNumber)) {
                    Alert.alert("Erreur", "Veuillez entrer un nombre valide");
                    return
                }

                try {
                    const userDocRef = doc(FIREBASE_DB, "users", currentUid);
                    await updateDoc(userDocRef, { sold: soldNumber });
                    Alert.alert("Solde mis a jour!");
                    await fetchData();
                } catch (error) {
                    console.error("Erreur :", error);
                    Alert.alert("Erreur", "Impossible de mettre à jour le solde !");
                }
            }
        )
    }

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
                        value={newExpenseAmount.toString()}
                        style={styles.input}
                        placeholder="Montant"
                        placeholderTextColor="#888"
                        keyboardType="numeric"
                        onChangeText={(text) => setNewExpenseAmount(Number(text))}
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
                        textStyle={{ color: '#00000097' }}
                        style={styles.dropdown}
                    />

                    <TouchableOpacity style={styles.submitButton} onPress={() => addExpenses()}>
                        <Text style={styles.submitText}>Ajouter</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.closeButton} onPress={() => { setOpen(false); setShowCard(false); }}>
                        <Text style={styles.closeText}>x</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <>
                    <View style={styles.card}>
                        <View style={styles.amoundAndData}>
                            <TouchableOpacity onPress={() => modifySold()}>
                                <Text style={styles.amountColor}>
                                    Solde : {userData?.sold ?? "Chargement..."} .-
                                </Text>

                            </TouchableOpacity>
                            <Text style={styles.dataColor}>{formattedDate}</Text>
                        </View>
                        <Text style={styles.amountInfos}>
                            Dépensé aujourd'hui : {getDayExpenses(expensesData)}.-
                        </Text>

                        <Text style={styles.amountInfos}>
                            Dernier achat : {lastExpense ? `${lastExpense.expenseTitle}` : "Aucune dépense"}
                        </Text>
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
        height: 30,
        width: 20,
        backgroundColor: "#eee",
        borderRadius: 15,
        padding: 5,
    },
    closeText: {
        fontWeight: "bold",
        color: "#555",
    },
    dropdown: {
        borderColor: "#55555535",
        backgroundColor: "#8888880c",
        justifyContent: "center",
    },

});


