import {
  StyleSheet,
  Text,
  View,
  Switch,
  FlatList,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import MyButton from "./MyButton";
import ListItem from "./ListItem";

export const List = ({ navigation }) => {
  const [locationFetching, setLocationFetching] = useState(false);
  const [location, setLocation] = useState(null);
  const [locationsArr, setLocationsArr] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [pickedLocations, setPickedLocations] = useState([]);

  const navigateToMap = () => {
    navigation.navigate("Map");
  };

  const getLocation = () => {
    setLocationFetching(true);
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      // let location;

      // let shouldSave = prompt("Pozycja pobrana czy zapisać");
      let location = await Location.getCurrentPositionAsync({});

      Alert.alert("pozycja", "pozycja została pobrana - czy zapisać?", [
        {
          text: "NIE",
          onPress: () => {
            console.log("Canceled Pressed");
          },
          style: "cancel",
        },
        {
          text: "TAK",
          onPress: () => {
            console.log("OK Pressed");
            setLocation(location);
            setLocationsArr([...locationsArr, location]);
          },
        },
      ]);
      setLocationFetching(false);

      console.log(location);
    })();
  };
  const clearLocationData = () => {
    setLocationsArr([]);
    setPickedLocations([]);
    alert("Dane zostały usunięte");
  };

  return (
    <View style={styles.container}>
      <View style={styles.btnSpace}>
        <MyButton
          text="POBIERZ I ZAPISZ POZYCJE"
          color="#265e07"
          passedFunc={getLocation}
        ></MyButton>
        <MyButton
          text="USUŃ WSZYSTKIE DANE"
          color="#265e07"
          passedFunc={clearLocationData}
        ></MyButton>
        <MyButton
          text="PRZEJDŹ DO MAPY"
          color="#265e07"
          passedFunc={navigateToMap}
        ></MyButton>
        <Switch></Switch>
      </View>
      <View style={styles.userList}>
        {/* {locationFetching ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : ( */}
        <FlatList
          data={locationsArr}
          renderItem={({ item }) => (
            <ListItem
              lat={item.coords.latitude}
              long={item.coords.longitude}
              date={item.timestamp}
              pickedLocations={pickedLocations}
              setPickedLocations={setPickedLocations}
            ></ListItem>
          )}
        ></FlatList>
        {/* )} */}
      </View>
      {locationFetching && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      )}
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
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 1,
  },
  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.5,
    backgroundColor: "black",
  },
});
