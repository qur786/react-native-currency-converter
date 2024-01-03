import React, { useState } from "react";
import { StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import type {
  DropDownPickerProps,
  ItemType,
} from "react-native-dropdown-picker";

interface CurrencyDropDownProps {
  items: ItemType<string>[];
  containerStyle?: DropDownPickerProps<string>["containerStyle"];
}

export function CurrencyDropdown({
  containerStyle,
  items,
}: CurrencyDropDownProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  return (
    <DropDownPicker
      open={isOpen}
      setOpen={setIsOpen}
      value={selectedValue}
      setValue={setSelectedValue}
      items={items}
      containerStyle={containerStyle}
      style={styles.box}
    />
  );
}

const styles = StyleSheet.create({
  box: {
    borderWidth: 1,
    borderColor: "#99AAAB",
  },
});
