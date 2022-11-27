import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";

export const Map = ({ route }) => {
  const { pickedLocations } = route.params;
  let zoomedLat = 0;
  let zoomedLong = 0;
  if (pickedLocations[0]) {
    zoomedLat = pickedLocations[0].lat;
    zoomedLong = pickedLocations[0].long;
  }
  useEffect(() => {
    console.log(pickedLocations);
    console.log("MAP");
  }, [pickedLocations]);

  return (
    <View style={styles.container}>
      {/* <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 50.0469,
          longitude: 19.9222,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        }}
      > */}
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: zoomedLat,
          longitude: zoomedLong,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        }}
      >
        {pickedLocations.map((loc) => {
          return (
            <Marker
              coordinate={{
                latitude: loc.lat,
                longitude: loc.long,
              }}
              title={"pos"}
              description={"opis"}
            />
          );
        })}
        <Marker
          coordinate={{
            latitude: 50.0469,
            longitude: 19.92221,
          }}
          title={"pos"}
          description={"opis"}
        />
      </MapView>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
