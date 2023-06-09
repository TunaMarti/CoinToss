import { useState } from "react";
import React from "react";
import {
  Animated,
  View,
  Text,
  Image,
  Button as RButton,
  StyleSheet,
} from "react-native";
import TailHeadButtons from "./components/TailHeadButtons";
import Button from "./components/Button";
import ArrayButton from "./components/ArrayButton";

const TextInANest = () => {
  // const face = ["yazı", "tura"];
  // const coin = ["yazı", "tura"];
  const buttons = ["Yazı", "Tura", "Dik", "Yamuk"];
  const [results, setResult] = useState<string[]>([]);
  const [titleText, setTitleText] = useState("Yazı tura için tıklayınız.");
  const [upperTitleText, setUpperTitleText] = useState("");
  const [pressCondition, setPressCond] = useState(false);
  const [resultOfBetText, setResultOfBetText] = useState("");
  const [clickedButtonSaver, setClickedButtonSaver] = useState<number>(-1);
  const [animation] = useState(new Animated.Value(100));

  const [arraySelected, setArraySelected] = useState("");

  const newButtonClick = (newValue: string) => {
    console.log(newValue);
    setArraySelected(newValue);
  };

  const sayiTut = (maxValue: number) => {
    const rand = Math.floor(Math.random() * maxValue);
    return rand;
  };

  const sayiTutVeEkle = () => {
    const random = sayiTut(buttons.length);
    results.push(buttons[random]);
  };

  function singleToss() {
    // const randomNumber = Math.round(Math.random());

    // clickedButtonSaver == randomNumber
    //   ? setResultOfBetText(
    //       "Sonuç: " + coin[randomNumber] + " Tebrikler kazandınız!"
    //     )
    //   : setResultOfBetText(
    //       "Sonuç: " + coin[randomNumber] + " Bir daha deneyin."
    //     );
    const randomSonuc = buttons[sayiTut(buttons.length)];
    if (arraySelected == randomSonuc) {
      setResultOfBetText("Tebrikler... " + randomSonuc + " Kazandı.");
    } else {
      setResultOfBetText("Kaybettiniz... " + randomSonuc + " Kazandı.");
    }
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
    results.length = 0;
    // if (clickedButtonSaver == -1) {
    //   setResultOfBetText("Lütfen bir tahminde bulununuz.");
    //   return;
    // }
    if (!arraySelected || arraySelected == "") {
      setResultOfBetText("Lütfen bir tahminde bulununuz.");
      return;
    }
    animate();
    setResultOfBetText("");
    setPressCond(true);

    setTitleText("Hesaplanıyor...");

    for (let index = 0; index < 100; index++) {
      sayiTutVeEkle();
    }

    setTimeout(() => {
      singleToss();
      setPressCond(false);
      setTitleText("Yazı tura için tıklayınız.");
      var aText = "";
      buttons.forEach((item) => {
        aText =
          aText +
          results.filter((x) => x == item).length / results.length +
          "\n";
      });
      setUpperTitleText(aText);

      // setUpperTitleText(
      //   "TURA ORANI:" +
      //     results.filter((x) => x == "tura").length / results.length +
      //     "\n" +
      //     "YAZI ORANI: " +
      //     results.filter((x) => x == "yazı").length / results.length
      // );
    }, 3000);
  };

  const trans = {
    transform: [{ translateY: animation }],
  };

  return (
    <View style={[styles.container]}>
      <View style={styles.header}>
        <Text style={[styles.title]}>{"Tahmininiz"}</Text>
        <ArrayButton
          titles={buttons}
          selectedValue={arraySelected}
          onClick={newButtonClick}
        />
        <TailHeadButtons
          _onClick={(item) => {
            setClickedButtonSaver(item);
          }}
        />
      </View>

      <View style={styles.animated}>
        <Animated.View style={trans}>
          {pressCondition ? (
            <Image
              style={styles.logo}
              source={require("../assets/coin-flip-38.gif")}
            />
          ) : results.length > 0 ? (
            <View style={styles.resultView}>
              <Text style={styles.title}>{upperTitleText}</Text>
            </View>
          ) : (
            <></>
          )}
        </Animated.View>
      </View>
      <View style={styles.footer}>
        <RButton
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
  header: {
    flexDirection: "row",
    flex: 2,
    backgroundColor: "darkorange",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  footer: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: "rgb(240, 240, 240)",
    alignItems: "center",
    justifyContent: "center",
  },
  animated: {
    flexDirection: "row",
    flex: 2,
    backgroundColor: "darkorange",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  resultView: {
    backgroundColor: "rgb(60, 72, 107)",
    width: 250,
    height: 125,
    borderRadius: 20,
    justifyContent: "center",
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
});

export default TextInANest;
