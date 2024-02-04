import { Tabs } from "expo-router/tabs";
import { StyleSheet, Image } from "react-native";

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
        headerTitle: "",
        tabBarActiveTintColor: "#FB2233",
      }}
    >
      <Tabs.Screen name="home" options={{}} />
      <Tabs.Screen name="profile" options={{}} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: "50",
  },
});
