import { FIREBASE_AUTH } from "@/app/firebase/FireBaseConfig";
import { Background, Button } from "@react-navigation/elements";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react"
import { ActivityIndicator, ImageBackground, KeyboardAvoidingView, TextInput, View } from "react-native";
import { StyleSheet, Text } from "react-native";
import { Alert } from "react-native";
import { updateProfile } from "firebase/auth";
import { useRouter } from "expo-router";


export default function Login() {
    const HomeImage = require("../../assets/images/rome.jpg");

    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    const signIn = async () => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);
            router.push("/screens/home")
        } catch (error: any) {
            console.log(error);
            alert('Sign in failed: ' + error.message)
        } finally {
            setLoading(false);
        }
    }

    const signUp = async () => {
        setLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            Alert.prompt(
                "Bienvenue !",
                "Quel est votre nom ?",
                async (name) => {
                    if (name) {
                        await updateProfile(response.user, { displayName: name });
                    }
                    router.push("/screens/home")
                }
            );
        } catch (error: any) {
            console.log(error);
            alert('Sign in failed: ' + error.message)
        } finally {
            setLoading(false);
        }
    }


    return (
        <ImageBackground
            source={HomeImage}
            style={styles.Background}
            blurRadius={1}
        >
            <View style={styles.container}>
                <Text style={styles.header}>Connectez vous ! </Text>
                <KeyboardAvoidingView behavior="padding">
                    <TextInput value={email} style={styles.input} placeholder="Email" placeholderTextColor="#888" autoCapitalize="none" onChangeText={(text) => setEmail(text)}></TextInput>
                    <TextInput value={password} style={styles.input} placeholder="Password" placeholderTextColor="#888" autoCapitalize="none" onChangeText={(text) => setPassword(text)} secureTextEntry={true}></TextInput>
                    {loading ? <ActivityIndicator size="large" color="#0000ff" />
                        : <>
                            <View style={styles.buttonRow}>
                            <Button style={styles.Button} onPress={signIn} >Login</Button>
                            <Button style={styles.Button} onPress={signUp} >Créer un compte</Button>
                            </View>
                        </>}
                </KeyboardAvoidingView>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    Background: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    header: {
        position: 'absolute',
        top: 160,
        fontSize: 30,
        color: "white"
    },
    input: {
        marginVertical: 4,
        height: 50,
        width: 350,
        borderWidth: 0.5,
        borderRadius: 10,
        padding: 10,
        backgroundColor: "#fff",
        borderColor: "gray"
    },
    buttonRow: {
        flexDirection: 'row',      
        justifyContent: 'space-between', 
        width: 350,                 
        marginTop: 10,
    },
    Button: {
        backgroundColor: "white",
        flex: 1,       
        marginHorizontal: 5,        
    },

})