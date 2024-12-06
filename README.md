UseState:
2
3
ReactNative:
2
Expo:
3
StatusBar:
3
UseEffect:
1
2
3

corregido:
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from "react-native";

export default function App() {
  const [title, setTitle] = useState("Press Me!");
  const otherTitle = "Other Title";

  useEffect(() => {
    console.log("Component mounted");
    return () => console.log("Component unmounted");
  }, []);

  const onPress = () => {
    console.log("Button pressed");
    setTitle("Button Pressed!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{title}</Text>
      <TouchableOpacity onPress={onPress}>
        <Text>{otherTitle}</Text>
      </TouchableOpacity>
      {}
      <StatusBar barStyle="default" />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
