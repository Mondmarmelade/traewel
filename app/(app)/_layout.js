import { StyleSheet, Image } from "react-native";
import { Tabs } from "expo-router/tabs";
import { FontAwesome } from "@expo/vector-icons";

export default function AppLayout() {
  return (
    <Tabs
      screenOptions={{
        headerBackground: () => (
          <Image
            style={styles.logo}
            resizeMode={"center"}
            source={require("../../assets/images/TraewelLogo.png")}
          />
        ),
        headerTitle: "", // leaves it empty
        tabBarActiveTintColor: "#FB2233",
        tabBarStyle: {
          height: 60,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={31} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" size={31} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: "50",
  },
});
