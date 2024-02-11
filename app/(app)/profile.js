import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import { useAuth } from "../../context/AuthContext";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

export default function profile() {
  const { logout, user } = useAuth();

  console.log(user);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={styles.profileView}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingBottom: 5,
          }}
        >
          <Image
            style={styles.profilePicture}
            resizeMode="contain"
            source={{
              uri: `${user?.profilePicture}`,
            }}
          />
          <View style={{ marginLeft: 20 }}>
            <Text
              style={{
                fontSize: 21,
                fontWeight: "700",
              }}
            >
              {user?.displayName}
            </Text>
            <Text
              selectable={true}
              style={{
                fontSize: 16,
                fontWeight: "300",
              }}
            >
              @{user?.username}
            </Text>
            <View style={{ flexDirection: "row", columnGap: 5, marginTop: 5 }}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  logout();
                }}
              >
                <MaterialIcons name="logout" size={18} color="white" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => {}}>
                <MaterialIcons name="settings" size={18} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.dataTextView}>
          <FontAwesome name="road" size={18} />
          <Text style={styles.dataText}>
            {new Intl.NumberFormat("de-DE", {
              style: "unit",
              unit: "meter",
            }).format(user?.trainDistance)}
          </Text>
        </View>

        <View style={styles.dataTextView}>
          <FontAwesome name="clock-o" size={21} />
          <Text style={styles.dataText}>
            {Math.floor(user?.trainDuration / 60)}h {user?.trainDuration % 60}
            min
          </Text>
        </View>

        <View style={styles.dataTextView}>
          <FontAwesome name="star-o" size={21} />
          <Text style={styles.dataText}>{user?.points} Pkt</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileView: {
    width: "90%",
    height: 200,
    borderColor: "#E7E7E7",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  button: {
    width: 40,
    height: 30,
    backgroundColor: "#FB2233",
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dataTextView: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 5,
    marginLeft: 5,
  },
  dataText: {
    marginTop: 5,
    fontSize: 18,
  },
});
