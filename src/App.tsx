import React, { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import type { PressableProps } from "react-native";
import Snackbar from "react-native-snackbar";
import { CurrencyDropdown } from "./components/CurrencyDropdown";
import { getCurrencyItems, TEMP_CURRENCY_EXCHANGE } from "./utils";

function App(): React.JSX.Element {
  const [amount, setAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState<number>(0);
  const [baseCurrency, setBaseCurrency] = useState<string | null>(null);
  const [toCurrency, setToCurrency] = useState<string | null>(null);

  const handleConvertPress: PressableProps["onPress"] = () => {
    const amt = Number.parseFloat(amount);
    if (Number.isNaN(amt) === true) {
      return Snackbar.show({
        text: "Enter valid amount",
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: "#E8290B",
      });
    }

    if (typeof baseCurrency !== "string") {
      return Snackbar.show({
        text: "Select base currency",
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: "#25CCF7",
      });
    }

    if (typeof toCurrency !== "string") {
      return Snackbar.show({
        text: "Select to currency",
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: "#25CCF7",
      });
    }

    const output =
      amt *
      (TEMP_CURRENCY_EXCHANGE[
        toCurrency as keyof typeof TEMP_CURRENCY_EXCHANGE
      ] /
        TEMP_CURRENCY_EXCHANGE[
          baseCurrency as keyof typeof TEMP_CURRENCY_EXCHANGE
        ]);

    setConvertedAmount(output);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Currency Converter</Text>
      <View style={styles.resultContainer}>
        <Text style={styles.resultTitle}>Converted Amount</Text>
        <Text style={styles.result}>{`${convertedAmount.toFixed(2)} ${
          toCurrency ?? ""
        }`}</Text>
        {typeof toCurrency === "string" && typeof baseCurrency === "string" ? (
          <Text
            style={
              styles.resultTitle
            }>{`Current Exchange Rate (${baseCurrency} - ${toCurrency})`}</Text>
        ) : undefined}
        <Text style={styles.result}>
          {typeof toCurrency === "string" && typeof baseCurrency === "string"
            ? (
                TEMP_CURRENCY_EXCHANGE[
                  toCurrency as keyof typeof TEMP_CURRENCY_EXCHANGE
                ] /
                TEMP_CURRENCY_EXCHANGE[
                  baseCurrency as keyof typeof TEMP_CURRENCY_EXCHANGE
                ]
              ).toFixed(2)
            : undefined}
        </Text>
      </View>
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
          value={baseCurrency}
          setValue={setBaseCurrency}
          items={getCurrencyItems()}
          containerStyle={styles.currencyDropdownFrom}
        />
        <CurrencyDropdown
          value={toCurrency}
          setValue={setToCurrency}
          items={getCurrencyItems()}
          containerStyle={styles.currencyDropdownTo}
        />
      </View>
    </SafeAreaView>
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
  resultContainer: {
    marginVertical: 24,
    alignItems: "center",
    gap: 10,
    backgroundColor: "#25CCF7",
    paddingVertical: 16,
    borderRadius: 12,
  },
  resultTitle: {
    color: "#ffffff",
    fontSize: 18,
  },
  result: {
    color: "#2C3335",
    fontSize: 16,
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
