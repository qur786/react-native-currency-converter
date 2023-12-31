import React from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default App;
