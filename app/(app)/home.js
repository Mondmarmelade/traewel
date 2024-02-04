import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import { useAuth } from "../../context/AuthContext";

export default function Home() {
  const { logout } = useAuth();
  return (
    <View>
      <Text>Home</Text>
      <Button
        title="Logout"
        onPress={() => {
          logout();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
