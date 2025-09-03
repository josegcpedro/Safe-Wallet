import { ImageBackground, Text, StyleSheet } from "react-native";

const HomeImage = require("../assets/images/athene.jpg");

export default function Index() {
  return (
    <ImageBackground
      source={HomeImage}
      style={StyleSheet.absoluteFillObject}
      resizeMode="cover"
    ></ImageBackground>
  );
}

