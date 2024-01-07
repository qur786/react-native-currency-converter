import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Home } from "./screens/Home";

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <Home />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
});

export default App;
