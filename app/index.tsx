import { ImageBackground, Text, StyleSheet } from "react-native";

const HomeImage = require("../assets/images/greece.jpg");

export default function Index() {
  return (
    <ImageBackground
      source={HomeImage}
      style={styles.background}
      resizeMode="cover"
    >
      <Text style={styles.text}>Connecter</Text>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
  },
  text: {
    color: "white",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 100,
  }
});
