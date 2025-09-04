import { Button } from "@react-navigation/elements";
import { useRouter } from "expo-router";
import { ImageBackground, Text, StyleSheet, Animated } from "react-native";


const HomeImage = require("../assets/images/rome.jpg");

export default function Index() {
  const router = useRouter();

  return (
    <ImageBackground
      source={HomeImage}
      style={styles.background}
    >
      <Text style={styles.text}>Bienvenue sur Safe Wallet!</Text>
      <Button
        onPress={() => router.push("/screens/login")}
        style={styles.Button}
      >
        Connecter
      </Button>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  text: {
    color: "#333333",
    fontSize: 30,
    textAlign: "center",
    marginBottom: 500,
  },
  Button: {
    width: 220,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    marginBottom: 200,
    alignItems: "center",
  },
});
