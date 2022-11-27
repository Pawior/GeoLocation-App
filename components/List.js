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
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyButton from "./MyButton";
import ListItem from "./ListItem";

export const List = ({ navigation }) => {
  const [locationFetching, setLocationFetching] = useState(false);
  const [location, setLocation] = useState(null);
  const [locationsArr, setLocationsArr] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [pickedLocations, setPickedLocations] = useState([]);
  const [isEnabled, setIsEnabled] = useState(false);

  const navigateToMap = () => {
    navigation.navigate("Map", { pickedLocations: pickedLocations });
  };

  const retrieveStorageData = () => {
    const getAllData = async () => {
      let keys = await AsyncStorage.getAllKeys();
      console.log("keys", keys);
      let stores = await AsyncStorage.multiGet(keys);
      console.log("stores", stores);
      let tempObj = {};
      let maps = stores.map((result, i, store) => {
        let key = store[i][0];
        let value = JSON.parse(store[i][1]);
        tempObj[`${key}`] = value;
        console.log(key, value);
        // if (Object.keys(tempObj).length == 3) {
        //   setLocationsArr([...locationsArr, tempObj]);
        //   Object.keys(tempObj).forEach((key) => {
        //     delete tempObj[key];
        //   });
        // }
        // setLocationsArr([...locationsArr, value]);
        setLocationsArr((prevArray) => [...prevArray, value]);
        // let objToState = {};
      });
    };
    getAllData();
  };

  useEffect(() => {
    retrieveStorageData();
  }, []);

  useEffect(() => {
    console.log("moja loc arra");
    console.log(locationsArr);
  }, [locationsArr]);

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
            setLocationsArr([
              ...locationsArr,
              {
                timestamp: location.timestamp,
                lat: location.coords.latitude,
                long: location.coords.longitude,
              },
            ]);
          },
        },
      ]);
      setLocationFetching(false);

      console.log(location);
    })();
  };
  const clearAll = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      // clear error
    }

    console.log("Done.");
  };
  const clearLocationData = () => {
    setLocationsArr([]);
    setPickedLocations([]);
    alert("Dane zostały usunięte");
    clearAll();
  };

  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
  };

  const getData = async () => {
    let val = await AsyncStorage.getItem("key");
    console.log(val);
  };
  useEffect(() => {
    // console.log(pickedLocations);
    // if (pickedLocations.length > 0) {
    //   setData(pickedLocations[pickedLocations.length - 1]);
    // }
    // getData();
  }, [pickedLocations]);

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
        <Switch onValueChange={toggleSwitch} value={isEnabled}></Switch>
      </View>
      <View style={styles.userList}>
        {/* {locationFetching ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : ( */}
        <FlatList
          data={locationsArr}
          renderItem={({ item }) => (
            <ListItem
              lat={item.lat}
              long={item.long}
              date={item.timestamp}
              pickedLocations={pickedLocations}
              setPickedLocations={setPickedLocations}
              isAllEnabled={isEnabled}
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
