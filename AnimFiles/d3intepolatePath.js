import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Animated
} from "react-native";
import Svg, { Path } from "react-native-svg";
const startPath = `M45,50a5,5 0 1,0 10,0a5,5 0 1,0 -10,0`;
const endPath = `M20,50a30,30 0 1,0 60,0a30,30 0 1,0 -60,0`;
import { interpolatePath } from "d3-interpolate-path";
export default class d3InterpolatePath extends React.Component {
  state = {
    animation: new Animated.Value(0)
  };
  onStartAnimation = () => {
    Animated.sequence([
      Animated.timing(this.state.animation, {
        toValue: 1,
        duration: 500
      }),
      Animated.delay(500),
      Animated.timing(this.state.animation, {
        toValue: 0,
        duration: 500
      })
    ]).start();
  };
  componentWillMount() {
    const interpolate = interpolatePath(startPath, endPath);
    this.state.animation.addListener(({ value }) => {
      const dValue = interpolate(value);
      this._path.setNativeProps({
        d: dValue
      });
    });
  }
  render() {
    const { container } = styles;
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.onStartAnimation}>
          <Svg width={100} height={100}>
            <Path
              d={startPath}
              stroke="black"
              ref={path => (this._path = path)}
            />
          </Svg>
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
  }
});
