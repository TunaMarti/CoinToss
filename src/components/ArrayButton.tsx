import React, { ComponentProps, useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Button from "./Button";

type IProps = ComponentProps<typeof View> & {
  titles: string[];
  selectedValue: string;
  onClick: (newValue: string) => void;
};

const ArrayButton: React.FC<IProps> = (props) => {
  const onButtonClick = (newValue: string) => {
    props.onClick(newValue);
  };

  return (
    <View style={styles.container}>
      {props.titles.map((item) => {
        return (
          <Button
            title={item}
            selected={props.selectedValue == item}
            onPress={() => onButtonClick(item)}
            style={styles.button}
            key={"ab_" + item}
          ></Button>
        );
      })}

      {/* <Button title="Yazı" selected={false} onPress={() => {}}></Button>
      <Button title="Tura" selected={false} onPress={() => {}}></Button>
      <Button title="Dik" selected={true} onPress={() => {}}></Button>
      <Button title="Yamuj" selected={false} onPress={() => {}}></Button> */}
    </View>
  );
};

export default ArrayButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  button: {
    marginHorizontal: 10,
    minWidth: 80,
  },
});
