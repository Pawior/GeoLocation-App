import { StyleSheet, Text, View, Switch, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import MyButton from "./MyButton";
import ListItem from "./ListItem";

export const List = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [locationsArr, setLocationsArr] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);

  const navigateToMap = () => {
    navigation.navigate("Map");
  };
  const getLocation = () => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setLocationsArr([...locationsArr, location]);
      console.log(location);
    })();
  };

  return (
    <View style={styles.container}>
      <View style={styles.btnSpace}>
        <MyButton
          text="POBIERZ I ZAPISZ POZYCJE"
          color="#265e07"
          passedFunc={getLocation}
        ></MyButton>
        <MyButton text="USUŃ WSZYSTKIE DANE" color="#265e07"></MyButton>
        <MyButton
          text="PRZEJDŹ DO MAPY"
          color="#265e07"
          passedFunc={navigateToMap}
        ></MyButton>
        <Switch></Switch>
      </View>
      <View style={styles.userList}>
        <FlatList
          data={locationsArr}
          renderItem={({ item }) => (
            <ListItem
              lat={item.coords.latitude}
              long={item.coords.longitude}
              date={item.timestamp}
            ></ListItem>
          )}
        ></FlatList>
      </View>
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnSpace: {
    flex: 1,
    // display: "flex",
    // justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  userList: {
    flex: 4,
    // borderWidth: 1,
  },
});
