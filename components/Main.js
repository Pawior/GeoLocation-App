import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { useFonts } from "expo-font";

export const Main = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    "Secular-One": require("../assets/fonts/SecularOne-Regular.ttf"),
    "Syne-Mono": require("../assets/fonts/SyneMono-Regular.ttf"),
  });

  const moveToList = () => {
    navigation.navigate("List");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={moveToList}>
        {fontsLoaded ? (
          <Text
            style={{
              fontFamily: "Syne-Mono",
              borderWidth: 0,
              fontSize: 70,
              marginRight: 25,
              width: "100%",
              marginBottom: 25,
              // margin: "auto",
              // padding: "auto",
              textAlign: "center",
            }}
          >
            {" "}
            Geo App
          </Text>
        ) : (
          <Text style={{ fontSize: 70 }}> Geo App</Text>
        )}
      </TouchableOpacity>
      <Text style={styles.smallText}> find and save your position</Text>
      <Text style={styles.smallText}> use google maps</Text>
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#b1f78b",
  },
  smallText: {
    fontSize: 17,
  },
});
