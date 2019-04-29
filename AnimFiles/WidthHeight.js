import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Animated
} from "react-native";
import Scale from "./Scale";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

type Props = {};
export default class WidthHeight extends Component<Props> {
  state = {
    animation: new Animated.Value(1)
  };
  onCall = () => {
    Animated.timing(this.state.animation, {
      toValue: 2,
      duration: 500
    }).start();
  };

  render() {
    const yinterpolate = this.state.animation.interpolate({
      inputRange: [1, 2],
      outputRange: [0, -25]
    });
    const boxStyle = {
      transform: [
        {
          scaleY: this.state.animation
        },
      {
        translateY : yinterpolate
      }
      ]
    };

    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.onCall}>
          <View>
          <View style={styles.box2} />  
            <Animated.View style={[styles.box, boxStyle]} />
          
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: "tomato"
  },
  box2: {
    width: 100,
    height: 100,
    backgroundColor: "blue"
  }
});
