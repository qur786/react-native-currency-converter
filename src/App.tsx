import React from "react";
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import { CurrencyDropdown } from "./components/CurrencyDropdown";

function App(): React.JSX.Element {
  return (
    <>
      <StatusBar />
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Currency Converter</Text>
        <View style={styles.dropdownContainer}>
          <CurrencyDropdown containerStyle={styles.currencyDropdownFrom} />
          <CurrencyDropdown containerStyle={styles.currencyDropdownTo} />
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dropdownContainer: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  currencyDropdownFrom: {
    flexShrink: 1,
  },
  currencyDropdownTo: {
    flexShrink: 1,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 16,
    color: "#3C40C6",
    fontFamily: "cursive",
  },
});

export default App;
