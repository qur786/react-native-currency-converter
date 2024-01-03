import React from "react";
import { SafeAreaView, StatusBar, StyleSheet, Text } from "react-native";

function App(): React.JSX.Element {
  return (
    <>
      <StatusBar />
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Currency Converter</Text>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dropdownContainer: {},
  title: {
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 16,
    color: "#3C40C6",
    fontFamily: "cursive",
  },
});

export default App;
