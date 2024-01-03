import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import type {
  DropDownPickerProps,
  ItemType,
} from "react-native-dropdown-picker";

interface CurrencyDropDownProps {
  containerStyle?: DropDownPickerProps<string>["containerStyle"];
}

export function CurrencyDropdown({
  containerStyle,
}: CurrencyDropDownProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [items, setItems] = useState<ItemType<string>[]>([
    {
      label: "India",
      value: "india",
    },
    {
      label: "USA",
      value: "usa",
    },
  ]);
  return (
    <DropDownPicker
      open={isOpen}
      setOpen={setIsOpen}
      value={selectedValue}
      setValue={setSelectedValue}
      items={items}
      setItems={setItems}
      containerStyle={containerStyle}
    />
  );
}
