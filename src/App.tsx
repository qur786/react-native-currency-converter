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
import { getCurrencyItems } from "./utils";

function App(): React.JSX.Element {
  const [amount, setAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState<number>(0);

  const handleConvertPress: PressableProps["onPress"] = () => {
    const amt = Number.parseFloat(amount);
    // TODO: add convert logic
    if (Number.isNaN(amt) === false) {
      setConvertedAmount(amt);
    } else {
      // TODO: add error handling.
    }
  };

  return (
    <>
      <StatusBar />
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Currency Converter</Text>
        <Text style={styles.convertedAmount}>Result: {convertedAmount}</Text>
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
          <CurrencyDropdown
            items={getCurrencyItems()}
            containerStyle={styles.currencyDropdownFrom}
          />
          <CurrencyDropdown
            items={getCurrencyItems()}
            containerStyle={styles.currencyDropdownTo}
          />
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
    color: "#25CCF7",
    fontFamily: "cursive",
  },
  convertedAmount: {
    textAlign: "center",
    height: 48,
    marginVertical: 20,
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
