/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Animated
} from "react-native";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

type Props = {};
export default class Scale extends Component<Props> {
  state = {
    animation: new Animated.Value(1)
  };

  onCall = () => {
    Animated.spring(this.state.animation, {
      toValue: 2,
      duration: 1500
    }).start();
  };
  render() {
    const animatedStyles = {
      transform: [
        {
          scale: this.state.animation
        }
      ]
    };

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.onCall}>
          <Animated.View style={[styles.box, animatedStyles]}>
            <Text style={styles.textflip}>Hello anudeep</Text>
          </Animated.View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  box: {
    height: 100,
    width: 100,
    backgroundColor: "tomato"
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  textflip: {}
});
