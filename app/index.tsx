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
      resizeMode="cover"
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
    color: "white",
    fontSize: 30,
    textAlign: "center",
    marginBottom: 500,
  },
  Button: {
    backgroundColor: "#FBFFFE",
    width: 220,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 200,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
});
