import React, { Component } from "react";
import { StyleSheet, View, Animated, TouchableWithoutFeedback } from "react-native";

export default class colorinterpolate extends Component {
  state = {
    animation: new Animated.Value(0),
  };
  startAnimation = () => {
    Animated.timing(this.state.animation, {
      toValue: 2,
      duration: 1500,
    }).start(() => {
      this.state.animation.setValue(0);
    });
  };

  render() {
    const colorInterpolate = this.state.animation.interpolate({
      inputRange: [0, 2],
      outputRange: ["rgb(255,99,71)", "rgb(99,71,255)"],
      
    });

    const colorInter  = this.state.animation.interpolate({
        inputRange: [0,  2],
        outputRange: ["rgba(255,99,71,0)", "rgba(99,71,255,1)"],
      });

    const animatedStyles = {
      backgroundColor: colorInterpolate,
    };
    const animstyles = 
    {
        backgroundColor: colorInter,

    }
    return (
      <Animated.View style={[styles.container,animstyles]}>
        <TouchableWithoutFeedback onPress={this.startAnimation}>
          <Animated.View style={[styles.box, animatedStyles]} />
        </TouchableWithoutFeedback>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    width: 150,
    height: 150,
  },
});