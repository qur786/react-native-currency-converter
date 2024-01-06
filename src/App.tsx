import React, { useEffect, useState } from "react";
import {
  Keyboard,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  Vibration,
  View,
} from "react-native";
import type { PressableProps } from "react-native";
import Snackbar from "react-native-snackbar";
import { CurrencyDropdown } from "./components/CurrencyDropdown";
import { connectDb, executeQuery } from "./db";
import { getCountryFlagFromCurrencyCode, getCurrencyItems } from "./utils";
import type { SQLiteDatabase } from "react-native-sqlite-storage";

function App(): React.JSX.Element {
  const [amount, setAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState<number>(0);
  const [baseCurrency, setBaseCurrency] = useState<string | null>(null);
  const [toCurrency, setToCurrency] = useState<string | null>(null);
  const [database, setDatabase] = useState<SQLiteDatabase | null>(null);
  const [currencyExchangeData, setCurrencyExchangeData] = useState<
    Record<string, number>
  >({});

  const handleConvertButtonPress: PressableProps["onPress"] = () => {
    const amt = Number.parseFloat(amount);
    if (Number.isNaN(amt) === true) {
      return Snackbar.show({
        text: "Enter valid amount",
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: "#E8290B",
      });
    }

    Keyboard.dismiss();

    if (typeof baseCurrency !== "string") {
      return Snackbar.show({
        text: "Select base currency",
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: "#E8290B",
      });
    }

    if (typeof toCurrency !== "string") {
      return Snackbar.show({
        text: "Select to currency",
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: "#E8290B",
      });
    }

    const output =
      amt *
      (currencyExchangeData[toCurrency] / currencyExchangeData[baseCurrency]);

    Vibration.vibrate(300);
    setConvertedAmount(Number.isNaN(output) === true ? output : 0);
  };

  const handleResetButtonPress: PressableProps["onPress"] = () => {
    setAmount("");
    setConvertedAmount(0);
    setBaseCurrency(null);
    setToCurrency(null);
    Keyboard.dismiss();
    Vibration.vibrate(300);
  };

  useEffect(() => {
    let db: SQLiteDatabase | null = null;
    async function initDB(): Promise<void> {
      db = await connectDb("ExchangeDB");
      setDatabase(db);
      const CreateExchangeDBQuery = `CREATE TABLE IF NOT EXISTS exchange_table (
        date TEXT,
        data JSON
    )`;
      await executeQuery(db, CreateExchangeDBQuery);
    }

    initDB().catch(() => {
      db?.close().catch(console.log);
    });

    return () => {
      db?.close().catch(console.log);
    };
  }, []);

  useEffect(() => {
    async function fetchData() {
      const GetTodayExchangeDataQuery =
        'Select data FROM exchange_table WHERE date=Date("now")';
      const result = await database?.executeSql(GetTodayExchangeDataQuery);
      if (result !== undefined && result[0].rows.length > 0) {
        const data = result[0].rows.item(0);
        console.log(data);
        setCurrencyExchangeData(data);
      } else {
        // TODO: fetch data using API
      }
    }

    fetchData().catch(console.log);
  }, [database]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Currency Converter</Text>
      <View style={styles.resultContainer}>
        <Text style={styles.resultTitle}>Converted Amount</Text>
        <Text style={styles.result}>{`${convertedAmount.toFixed(2)} ${
          typeof toCurrency === "string"
            ? getCountryFlagFromCurrencyCode(toCurrency)
            : ""
        }`}</Text>
        {typeof toCurrency === "string" && typeof baseCurrency === "string" ? (
          <Text
            style={
              styles.resultTitle
            }>{`Current Exchange Rate (${getCountryFlagFromCurrencyCode(
            baseCurrency
          )} - ${getCountryFlagFromCurrencyCode(toCurrency)})`}</Text>
        ) : undefined}
        <Text style={styles.result}>
          {typeof toCurrency === "string" &&
          typeof baseCurrency === "string" &&
          typeof currencyExchangeData[toCurrency] === "number" &&
          typeof currencyExchangeData[baseCurrency] === "number"
            ? (
                currencyExchangeData[toCurrency] /
                currencyExchangeData[baseCurrency]
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
      </View>
      <View style={styles.btnContainer}>
        <Pressable
          onPress={handleConvertButtonPress}
          android_ripple={{
            color: "#67E6DC",
          }}
          style={styles.convertBtn}>
          <Text style={styles.convertBtnText}>Convert</Text>
        </Pressable>
        <Pressable
          onPress={handleResetButtonPress}
          android_ripple={{
            color: "#67E6DC",
          }}
          style={styles.resetBtn}>
          <Text style={styles.resetBtnText}>Reset</Text>
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
  btnContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
    marginTop: 16,
  },
  convertBtn: {
    backgroundColor: "#25CCF7",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  resetBtn: {
    backgroundColor: "#25CCF7",
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 8,
  },
  convertBtnText: {
    color: "#ffffff",
  },
  resetBtnText: {
    color: "#ffffff",
  },
});

export default App;
