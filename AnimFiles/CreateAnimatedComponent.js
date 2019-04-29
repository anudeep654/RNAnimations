import React from "react";
import { View, StyleSheet, Text, Button, Animated } from "react-native";
const AnimatedButton = Animated.createAnimatedComponent(ourMagicalButton);

export default class ourMagicalButton extends React.Component {
  state = {
    animation: new Animated.Value(0)
  };
  setNativeProps = (nativeProps) => {
    this.button.setNativeProps(nativeProps);
  };
  startAnimation = () => {
    Animated.timing(this.state.animation, {
      toValue: 1,
      duration: 100
    }).start(() => {
      Animated.timing(this.state.animation, {
        toValue: 0,
        duration: 100
      }).start();
    });
  };

  render() {
    const animButton = this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: ["rgb(255,99,71)", "rgb(255,255,255)"]
    });
    return (
      <View style={styles.container}>
        <AnimatedButton
          ref={component => this.button = component}
          title="Press me"
          onPress={this.startAnimation}
          color={animButton}
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
  }
});
