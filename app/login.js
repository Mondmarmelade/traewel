import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";

import { useAuth } from "../context/AuthContext";

export default function login() {
  const { promptLoginAsync, loginRequest } = useAuth();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image
        style={styles.logo}
        resizeMode={"contain"}
        source={require("../assets/images/TraewelLogo.png")}
      />
      <TouchableOpacity
        style={styles.button}
        disabled={!loginRequest}
        onPress={() => {
          promptLoginAsync();
        }}
      >
        <Text style={styles.buttonText}>Mit Träwelling einloggen</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: "50%",
  },
  button: {
    width: "90%",
    backgroundColor: "#FB2233",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "800",
    color: "white",
  },
});
