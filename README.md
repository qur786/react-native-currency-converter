# Currency Converter

## Description

Currency Converter is a mobile application built with React Native that allows users to convert between over 170 currencies. It facilitates easy calculations for currency exchange rates between different countries.

## Features

- **Extensive Currency Database:** Access to 170+ currencies for accurate conversions.
- **Interactive UI Dropdown:** Utilizes [react-native-dropdown-picker](https://www.npmjs.com/package/react-native-dropdown-picker) for intuitive base and conversion currency selection.
- **Error Messaging:** Incorporated [react-native-snackbar](https://www.npmjs.com/package/react-native-snackbar) to display various error messages for seamless user experience.
- **Real-Time Exchange Rates:** Utilizes the [Fixer API](https://fixer.io/) to provide up-to-date exchange rates.
- **Flag Display:** Shows corresponding country flags using Unicode icons alongside currency names.

## Installation

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Run `react-native run-android` or `react-native run-ios` to start the application.

## Usage

1. Select the base and conversion currencies from the dropdown.
2. Enter the amount to convert.
3. View the converted amount instantly.

## Dependencies

- react: 18.2.0
- react-native: 0.73.1
- react-native-dropdown-picker: ^5.4.6
- react-native-snackbar: ^2.6.2

## API Reference

- [Fixer API](https://fixer.io/)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
