import React, { useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { CurrencyDropdown } from "./components/CurrencyDropdown";

function App(): React.JSX.Element {
  const [amount, setAmount] = useState("");

  return (
    <>
      <StatusBar />
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Currency Converter</Text>
        <View style={styles.amountContainer}>
          <Text style={styles.amountLabel}>Amount</Text>
          <TextInput
            value={amount}
            onChangeText={setAmount}
            keyboardType="number-pad"
            placeholder="Enter amount"
            style={styles.amountInput}
          />
        </View>
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
    paddingHorizontal: 16,
  },
  dropdownContainer: {
    flexDirection: "row",
    gap: 10,
    marginVertical: 16,
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
  amountContainer: {},
  amountLabel: {
    marginVertical: 12,
    color: "#2F363F",
  },
  amountInput: {
    borderWidth: 1,
    borderRadius: 8,
  },
});

export default App;
