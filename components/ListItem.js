import { StyleSheet, Text, View, Switch, Image } from "react-native";
import React, { useState, useEffect } from "react";

export const ListItem = ({
  date,
  lat,
  long,
  pickedLocations,
  setPickedLocations,
}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  useEffect(() => {
    console.log(isEnabled);
    if (isEnabled) {
      setPickedLocations([
        ...pickedLocations,
        { timestamp: date, lat: lat, long: long },
      ]);
    } else {
      setPickedLocations(
        pickedLocations.filter((location) => location.timestamp != date)
      );
    }
    console.log(pickedLocations);
  }, [isEnabled]);
  useEffect(() => console.log(pickedLocations), [pickedLocations]);

  const toggleSwitch = async () => {
    await setIsEnabled((previousState) => !previousState);
    // if (isEnabled) {
    //   setPickedLocations([
    //     ...pickedLocations,
    //     { timestamp: date, lat: lat, long: long },
    //   ]);
    // } else {
    //   setPickedLocations(
    //     pickedLocations.filter((location) => location.timestamp != date)
    //   );
    // }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image
          style={styles.tinyLogo}
          source={require("../assets/map.png")}
        ></Image>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.boldedText}>timestamp:</Text>
        <Text style={styles.boldedText}>{date}</Text>
        <Text>latitude: {lat}</Text>
        <Text>longitude: {long}</Text>
      </View>

      <View style={styles.switchContainer}>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          // thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        ></Switch>
      </View>
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 30,
  },
  imgContainer: {
    // flex: 1,
    // marginRight: 10,
    marginRight: 10,
  },
  infoContainer: {
    // flex: 1,
  },
  switchContainer: {},
  tinyLogo: {},
  boldedText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#265e07",
  },
});
