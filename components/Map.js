import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";

export const Map = () => {
  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 50.0469,
          longitude: 19.9222,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        }}
      >
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
