import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useAuth } from "../../context/AuthContext";
import { MaterialIcons } from "@expo/vector-icons";

export default function profile() {
  const { logout } = useAuth();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>profile</Text>
      <TouchableOpacity
        style={styles.button}
        // disabled={!loginRequest}
        onPress={() => {
          logout();
        }}
      >
        <Text style={styles.buttonText}>Abmelden</Text>
        <MaterialIcons name="logout" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "50%",
    backgroundColor: "#FB2233",
    height: 50,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "800",
    color: "white",
    marginRight: 10,
  },
});
