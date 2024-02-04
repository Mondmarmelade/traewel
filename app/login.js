import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";

import { useAuth } from "../context/AuthContext";

export default function login() {
  const { promptLoginAsync, loginRequest } = useAuth();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button
        disabled={!loginRequest}
        title="Login"
        onPress={() => {
          promptLoginAsync();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
