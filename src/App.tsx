import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "./screens/Home";
import type { RootStackParamList } from "./route-types";

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

const Offline = () => <Text>Offline</Text>;

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Navigator
          initialRouteName="home"
          screenOptions={{ headerShown: false }}>
          <Screen name="home" component={Home} />
          <Screen name="offline" component={Offline} />
        </Navigator>
      </NavigationContainer>
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
