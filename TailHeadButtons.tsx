import React, { ComponentProps, useState } from "react";
import {
  Animated,
  Button,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import Bounce from "./anime";

type IProps = ComponentProps<typeof View> & {
  _onClick: (i: number) => void;
};

const TailHeadButtons = (props: IProps) => {
  const [headButtonColor, setHeadButtonColor] = useState("lightblue");
  const [tailButtonColor, setTailButtonColor] = useState("lightblue");
  return (
    <View style={stylesButton.container}>
      <Button
        onPress={() => {
          setHeadButtonColor("darkblue");
          setTailButtonColor("lightblue");
          props._onClick(0);
        }}
        title={"Yazı"}
        color={headButtonColor}
      />
      <Button
        onPress={() => {
          setTailButtonColor("darkblue");
          setHeadButtonColor("lightblue");
          props._onClick(1);
        }}
        title={"Tura"}
        color={tailButtonColor}
      />
    </View>
  );
};

export default TailHeadButtons;

const stylesButton = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 20,
  },
  button: {
    height: 100,
    width: 120,
    padding: 20,
  },
});
