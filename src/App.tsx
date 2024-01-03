import React, { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import type { PressableProps } from "react-native";
import { CurrencyDropdown } from "./components/CurrencyDropdown";

function App(): React.JSX.Element {
  const [amount, setAmount] = useState("");

  const handleConvertPress: PressableProps["onPress"] = () => {
    console.log("Hello");
  };

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
          <Pressable
            onPress={handleConvertPress}
            android_ripple={{
              color: "#67E6DC",
            }}
            style={styles.convertBtn}>
            <Text style={styles.convertBtnText}>Convert</Text>
          </Pressable>
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
  title: {
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 16,
    color: "#3C40C6",
    fontFamily: "cursive",
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
  amountContainer: {
    gap: 12,
  },
  amountLabel: {
    fontSize: 16,
  },
  amountInput: {
    borderWidth: 1,
    borderColor: "#99AAAB",
    borderRadius: 8,
  },
  convertBtn: {
    backgroundColor: "#25CCF7",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: "flex-end",
  },
  convertBtnText: {
    color: "#ffffff",
  },
});

export default App;
