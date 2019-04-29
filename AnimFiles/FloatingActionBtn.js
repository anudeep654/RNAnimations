import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback
} from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default class FloatingActionBtn extends React.Component {
  toggleButton = () => {
    const toValue = this._open ? 0 : 1;
    Animated.timing(this.state.animation, {
      toValue,
      duration: 300
    }).start();
    this._open = !this._open;
  };

  state = {
    animation: new Animated.Value(0)
  };

  render() {
    const reloadInterpolate = this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -70]
    });
    const orderInterpolate = this.state.animation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, -70, -140]
    });
    const labelInterpolation = this.state.animation.interpolate({
      inputRange: [0, 0.8, 1],
      outputRange: [-30, -60, -90]
    });
    const labelOpacity = this.state.animation.interpolate({
      inputRange: [0, 0.8, 1],
      outputRange: [0, 0, 1]
    });
    const reloadStyle = {
      transform: [
        {
          translateY: reloadInterpolate
        }
      ]
    };
    const orderStyle = {
      transform: [
        {
          translateY: orderInterpolate
        }
      ]
    };
    const scaleInterpolate = this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 30]
    });

    const labelStyle = {
      transform: [
        {
          translateX: labelInterpolation
        }
      ],
      opacity: labelOpacity
    };

    const bgStyle = {
      transform: [
        {
          scale: scaleInterpolate
        }
      ]
    };

    const {
      container,
      button,
      pay,
      payText,
      other,
      label,
      background
    } = styles;
    return (
      <View style={container}>
        <Animated.View style={[background, bgStyle]} />
        <TouchableWithoutFeedback onPress={this.toggleButton}>
          <Animated.View style={[button, other, orderStyle]}>
            <Animated.Text style={[label, labelStyle]}>Order</Animated.Text>
            <Icon name="food-fork-drink" size={20} color="#555" />
          </Animated.View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={this.toggleButton}>
          <Animated.View style={[button, other, reloadStyle]}>
            <Animated.Text style={[label, labelStyle]}>Reload</Animated.Text>
            <Icon name="reload" size={20} color="#555" />
          </Animated.View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={this.toggleButton}>
          <View style={[button, pay]}>
            <Animated.Text style={[label, labelStyle]}>Pay</Animated.Text>
            <Text style={payText}>$5.00</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  background: {
    backgroundColor: "rgba(0,0,0,.2)",
    position: "absolute",
    width: 60,
    height: 60,
    bottom: 20,
    right: 20,
    borderRadius: 30
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    position: "absolute",
    bottom: 20,
    right: 20,
    shadowOffset: { x: 2, y: 0 },
    shadowColor: "#333",
    shadowRadius: 2,
    shadowOpacity: 0.1,
    alignItems: "center",
    justifyContent: "center"
  },
  pay: {
    backgroundColor: "#00B15E"
  },
  payText: {
    color: "#fff"
  },
  other: {
    backgroundColor: "#fff"
  },
  label: {
    color: "#FFF",
    position: "absolute",
    fontSize: 18,
    backgroundColor: "transparent"
  }
});
