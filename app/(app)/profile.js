import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import { useAuth } from "../../context/AuthContext";
import { MaterialIcons } from "@expo/vector-icons";

export default function profile() {
  const { logout, user } = useAuth();

  console.log(user.profilePicture);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image
        style={styles.profilePicture}
        resizeMode="contain"
        source={{
          uri: `${user?.profilePicture}`,
        }}
      />
      <Text>{user?.displayName}</Text>
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
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
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
