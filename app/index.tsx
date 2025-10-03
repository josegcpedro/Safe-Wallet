import { Button } from "@react-navigation/elements";
import { useRouter } from "expo-router";
import { ImageBackground, Text, StyleSheet } from "react-native";


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
      <Text onPress={() => router.push("/screens/whoAreWe")} style={styles.whoAreWe}>
        Qui sommes nous ?
      </Text>
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
    color: "#ffff",
    fontSize: 30,
    textAlign: "center",
    marginBottom: 500,
  },
  Button: {
    width: 220,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    backgroundColor: "#FFFFFF",
    marginBottom: 200,
    alignItems: "center",
  },
  whoAreWe: {
    position: "absolute",
    bottom: 100,
    color: "#ffff",
  }
});
