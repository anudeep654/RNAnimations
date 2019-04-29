import React from "react";
import { View, Text, StyleSheet, PanResponder, Animated } from "react-native";

export default class Decay extends React.Component {
  state = {
    animation: new Animated.ValueXY(0)
  };

  componentWillMount() {
    this._x = 0;
    this._y = 0;
    this.state.animation.addListener(value => {
      (this._x = value.x), (this._y = value.y);
    });

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        this.state.animation.setOffset({ x: this._x, y: this._y });
        this.state.animation.setValue({ x: 0, y: 0 });
    //    this.state.animation.flattenOffset() 
      },
      onPanResponderMove: Animated.event([
        null,
        {
          dx: this.state.animation.x,
          dy: this.state.animation.y
        }
      ]),
      onPanResponderRelease: (event, { vx, vy }) => {
     
        Animated.decay(this.state.animation, {
          velocity: {
            x: vx,
            y: vy
          },
          deceleration: 0.997
        }).start();
       // this.state.animation.flattenOffset(); //Flatten the offset
      }
    });
  }

  render() {
    const { container, innerBox } = styles;
    const animatedStyle = {
      transform: this.state.animation.getTranslateTransform()
    };
    return (
      <View style={container}>
        <Animated.View
          style={[innerBox, animatedStyle]}
          {...this._panResponder.panHandlers}
        />
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
  innerBox: {
    width: 100,
    height: 100,
    backgroundColor: "red"
  }
});
