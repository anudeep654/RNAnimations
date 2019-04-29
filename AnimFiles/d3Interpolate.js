import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated
} from "react-native";
import { interpolateNumber, interpolateRgb } from "d3-interpolate";
export default class D3Interpolate extends React.Component {
  state = {
    animation: new Animated.Value(0)
  };
  startAnimation = () => {
    Animated.timing(this.state.animation, {
      toValue: 1,
      duration: 500
    }).start();
  };
  componentWillMount() {
    const positionInterpolate = interpolateNumber(0, 200);
    const colorInterpolate = interpolateRgb("rgb(255,99,71)", "rgb(99,71,255)");
    this.state.animation.addListener(({ value }) => {
      const position = positionInterpolate(value);
      const color = colorInterpolate(value);

      const style = [
        styles.box,
        {
          backgroundColor: color,
          transform: [
            {
              translateY: position
            }
          ]
        }
      ];
      this._view.setNativeProps({style});
    });
  }

  render() {
    const { container, box } = styles;

    // const animatedStyles = {
    //   backgroundColor: this.state.animation.interpolate({
    //     inputRange: [0, 1],
    //     outputRange: ["rgb(255,99,71)", "rgb(99,71,255)"]
    //   }),
    //   transform: [
    //     {
    //       translateY: this.state.animation.interpolate({
    //         inputRange: [0, 1],
    //         outputRange: [0, 200]
    //       })
    //     }
    //   ]
    // };

    return (
      <View style={container}>
        <TouchableWithoutFeedback onPress={this.startAnimation}>
          <View
            style={box}
            ref={view => (this._view = view)}
          />
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
    height: 100,
    width: 100,
    backgroundColor: "tomato"
  }
});
