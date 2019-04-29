import React from "react";
import {
  Text,
  StyleSheet,
  View,
  Animated,
  PanResponder,
  Dimensions
} from "react-native";

export default class Cliff extends React.Component {
  state = {
    animation: new Animated.ValueXY()
  };

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        this.state.animation.extractOffset();
      },
      onPanResponderMove: Animated.event([
        null,
        {
          dx: this.state.animation.x,
          dy: this.state.animation.y
        }
      ])
    });
  }

  render() {
    const { container, center, border, box } = styles;
    const { height } = Dimensions.get("window");
    const backgroundinterpolate = this.state.animation.y.interpolate({
      inputRange: [0, height / 2-50.01, height / 2-50,height],
      outputRange: ["rgb(99,71,255)", "rgb(99,71,255)","rgb(255,0,0)","rgb(255,0,0)"]
    });
    const animatedStyles = {
      backgroundColor: backgroundinterpolate,
      transform: [...this.state.animation.getTranslateTransform()]
    };

    return (
      <View style={container}>
        <View style={[container, center, border]}>
          <Text>Good</Text>
        </View>
        <View style={[container, center]}>
          <Text>Bad</Text>
        </View>
        <Animated.View
          {...this._panResponder.panHandlers}
          style={[box, animatedStyles,center]}
        >
          <Text>Box</Text>
        </Animated.View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  center: {
    alignItems: "center",
    justifyContent: "center"
  },
  border: {
    borderBottomWidth: 1,
    borderColor: "black"
  },
  box: {
    position: "absolute",
    height: 50,
    width: 50,
    top: 0,
    left: 0
  }
});
