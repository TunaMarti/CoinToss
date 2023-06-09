import { useState } from "react";
import React from "react";
import { Animated, View, Text, Image, Button, StyleSheet } from "react-native";
import TailHeadButtons from "./tailHeadButtons";

const TextInANest = () => {
  const face = ["yazı", "tura"];
  const coin = ["yazı", "tura"];
  var results: string[] = [];
  const [titleText, setTitleText] = useState("Yazı tura için tıklayınız.");
  const [upperTitleText, setUpperTitleText] = useState("");
  const bodyText = "This is not really a bird nest.";
  const [pressCondition, setPressCond] = useState(false);
  const [resultOfBetText, setResultOfBetText] = useState("");
  const [clickedButtonSaver, setClickedButtonSaver] = useState<number>(-1);
  const [animation, setAnimation] = useState(new Animated.Value(100));

  function timer() {
    setTitleText("Hesaplanıyor...");
    const result = face[Math.round(Math.random())];
    // setTimeout(() => setTitleText(]), 0);
    results.push(result);
  }

  function singleToss() {
    const randomNumber = Math.round(Math.random());
    console.log(clickedButtonSaver);
    clickedButtonSaver != -1
      ? clickedButtonSaver == randomNumber
        ? setResultOfBetText(
            "Sonuç: " + coin[randomNumber] + " Tebrikler kazandınız!"
          )
        : setResultOfBetText(
            "Sonuç: " + coin[randomNumber] + " Bir daha deneyin."
          )
      : setResultOfBetText("Lütfen bir tahminde bulununuz.");
  }

  const animate = () => {
    animation.setValue(100);
    Animated.spring(animation, {
      toValue: -50,
      //   duration:2000,
      friction: 1,
      tension: 20,
      useNativeDriver: true,
    }).start();
  };

  const onPressTitle = () => {
    animate();
    setResultOfBetText("");
    setPressCond(true);
    for (let index = 0; index < 100; index++) {
      timer();
    }
    setTimeout(() => {
      singleToss();
      setPressCond(false);
      setTitleText("Yazı tura için tıklayınız.");
      setUpperTitleText(
        "TURA ORANI:" +
          results.filter((x) => x == "tura").length / results.length +
          "\n" +
          "YAZI ORANI: " +
          results.filter((x) => x == "yazı").length / results.length
      );
    }, 3000);
  };

  const trans = {
    transform: [{ translateY: animation }],
  };

  return (
    <View
      style={[
        styles.container,
        {
          // Try setting `flexDirection` to `"row"`.
          flexDirection: "column",
        },
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          flex: 2,
          backgroundColor: "darkorange",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 5,
        }}
      >
        <Text style={[styles.title]}>{"Tahmininiz"}</Text>
        <TailHeadButtons
          _onClick={(item) => {
            setClickedButtonSaver(item);
          }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          flex: 2,
          backgroundColor: "darkorange",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 5,
        }}
      >
        <Animated.View style={trans}>
          {pressCondition ? (
            <Image
              style={styles.logo}
              source={require("./assets/coin-flip-38.gif")}
            />
          ) : results != null ? (
            <View
              style={{
                backgroundColor: "rgb(60, 72, 107)",
                width: 250,
                height: 125,
                borderRadius: 20,
                justifyContent: "center",
              }}
            >
              <Text style={styles.title}>{upperTitleText}</Text>
            </View>
          ) : null}
        </Animated.View>
      </View>
      <View
        style={{
          flexDirection: "column",
          flex: 1,
          backgroundColor: "rgb(240, 240, 240)",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          title={titleText}
          color="rgb(60, 72, 107)"
          onPress={onPressTitle}
        />
        <Text
          style={[
            styles.resultTitle,
            { color: clickedButtonSaver != -1 ? "black" : "red" },
          ]}
        >
          {resultOfBetText}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  logo: {
    width: 200,
    height: 300,
    paddingLeft: 0,
    borderRadius: 20,
  },
  title: {
    textAlign: "center",
    marginVertical: 8,
    fontWeight: "bold",
    color: "white",
  },
  resultTitle: {
    textAlign: "center",
    marginVertical: 8,
    fontWeight: "bold",
  },
  controlSpace: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#F5F5F5",
  },
});

export default TextInANest;
