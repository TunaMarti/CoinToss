import React, { ComponentProps, useContext, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type IProps = ComponentProps<typeof View> & {
  title: string;
  selected?: boolean;
  onPress: () => void;
};

const Button: React.FC<IProps> = ({
  title,
  selected,
  onPress,
  ...restOfProp
}) => {
  const onClick = () => {
    // ada a sd
    onPress();
  };

  return (
    <TouchableOpacity
      {...restOfProp}
      style={[
        styles.container,
        selected ? styles.selectedState : {},
        restOfProp.style,
      ]}
      onPress={onClick}
    >
      <Text style={styles.button}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#64b5f6",
    borderRadius: 8,
  },
  button: {
    margin: 5,
    textAlign: "center",
  },
  selectedState: {
    backgroundColor: "#43a047",
  },
});
