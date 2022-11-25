import { StyleSheet, Text, View } from "react-native";
import React from "react";

export const ListItem = ({ date, lat, long }) => {
  return (
    <View style={styles.container}>
      <Text>ListItem</Text>
      <Text>{date}</Text>
      <Text>{lat}</Text>
      <Text>{long}</Text>
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
