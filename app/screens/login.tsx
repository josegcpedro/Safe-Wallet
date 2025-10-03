import { FIREBASE_AUTH, FIREBASE_DB } from "@/src/firebase/FireBaseConfig";
import { Button } from "@react-navigation/elements";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { ActivityIndicator, Alert, KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from "react-native";

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [name, setName] = useState('');
    const [salary, setSalary] = useState('');
    const [sold, setSold] = useState('');
    const auth = FIREBASE_AUTH;

    const signIn = async () => {
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push("/screens/home");
        } catch (error: any) {
            console.log(error);
            Alert.alert("Erreur", error.message);
        } finally {
            setLoading(false);
        }
    };

    const signUp = async () => {
        setLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            setShowInfo(true)
        } catch (error: any) {
            console.log(error);
            Alert.alert("Erreur", error.message);
        } finally {
            setLoading(false);
        }
    };

    const saveMoreInfo = async () => {
        setLoading(true);
        try {
            const user = FIREBASE_AUTH.currentUser;
            if (user) {
                await setDoc(
                    doc(FIREBASE_DB, "users", user.uid),
                    {
                        email,
                        name,
                        salary: Number(salary), // convertir en nombre
                        sold: Number(sold),     // convertir en nombre
                    },
                    { merge: true } // merge pour ne pas écraser l'email
                );
                Alert.alert("Succès", "Informations supplémentaires enregistrées !");
                setShowInfo(false); // tu peux revenir à l'écran principal ou router ailleurs
                router.push("/screens/home"); // redirection vers l'accueil
            }
        } catch (error: any) {
            console.log(error);
            Alert.alert("Erreur", error.message);
        } finally {
            setLoading(false);
        }
    };

    return (

        <View style={styles.container}>
            <Text style={styles.header}>Connectez vous !</Text>
            <KeyboardAvoidingView behavior="padding">
                {!showInfo ? (
                    <>
                        <TextInput
                            value={email}
                            style={styles.input}
                            placeholder="Email"
                            placeholderTextColor="#888"
                            autoCapitalize="none"
                            onChangeText={(text) => setEmail(text)}
                        />
                        <TextInput
                            value={password}
                            style={styles.input}
                            placeholder="Password"
                            placeholderTextColor="#888"
                            autoCapitalize="none"
                            secureTextEntry={true}
                            onChangeText={(text) => setPassword(text)}
                        />
                        {loading ? (
                            <ActivityIndicator size="large" color="#0000ff" />
                        ) : (
                            <>
                                <View style={styles.buttonRow}>
                                    <Button style={styles.Button} onPress={signIn}>Login</Button>
                                    <Button style={styles.Button} onPress={signUp}>Créer un compte</Button>
                                </View>
                            </>
                        )}
                    </>
                ) : (
                    <>

                        {/* Nouvelle view pour plus d'infos */}
                        <Text style={{ marginBottom: 10 }}>Merci de compléter vos informations :</Text>
                        <TextInput
                            placeholder="Nom d'affichage"
                            style={styles.input}
                            onChangeText={(text) => setName(text)}
                        />
                        <TextInput
                            placeholder="Salaire mensuel"
                            style={styles.input}
                            onChangeText={(int) => setSalary(int)}
                        />
                        <TextInput
                            placeholder="Solde bancaire actuel"
                            style={styles.input}
                            onChangeText={(text) => setSold(text)}
                        />
                        <Button style={styles.InfoButton} onPress={saveMoreInfo}>Confirmer</Button>
                    </>
                )}
            </KeyboardAvoidingView>

            <Text style={styles.returnButton} onPress={() => router.push("/")}>
                Retour
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f3eeeaff",
    },
    header: {
        position: 'absolute',
        top: 165,
        fontSize: 30,
        color: "#555",
    },
    input: {
        marginVertical: 4,
        height: 50,
        width: 350,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        backgroundColor: "#FFFFFF",
        borderColor: "#CCCCCC",
        color: "#555",
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 350,
        marginTop: 10,
    },
    Button: {
        flex: 1,
        marginHorizontal: 5,
        paddingVertical: 12,
        borderRadius: 10,
        backgroundColor: "#FFFFFF"
    },
    returnButton: {
        fontSize: 15,
        color: "#555",
        paddingTop: 20,
    },
    InfoButton: {
        borderRadius: 10,
        width:350,
        backgroundColor: "#FFFFFF"
    },

});
