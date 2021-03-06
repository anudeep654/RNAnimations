import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback
} from "react-native";

export default class ParallelAnim extends React.Component {
  state = {
    colorAnimation: new Animated.Value(0),
    scaleAnimation: new Animated.Value(1)
  };

  onStartAnimation = () => {
    Animated.parallel([
      Animated.timing(this.state.scaleAnimation, {
        toValue: 2,
        duration: 500
      }),
      Animated.timing(this.state.colorAnimation, {
        toValue: 1,
        duration: 300
      })
    ]).start(() => {
      alert("Both animations are done");
    });
  };

  render() {
      const backGroundColor  = this.state.colorAnimation.interpolate({
          inputRange:[0,1],
          outputRange: ["rgb(99,71,255)","rgb(255,99,71)"]
      })
    const boxStyle = {
        backgroundColor:backGroundColor,
      transform: [{ scale: this.state.scaleAnimation }]
    };
    const textStyle = {
       // color:backGroundColor
    }

    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback  onPress={this.onStartAnimation}>
          <Animated.View
            style={[styles.box, boxStyle]}
           
          >
            <Animated.Text style={[styles.boxText,textStyle]}>Hello Anudeep</Animated.Text>
          </Animated.View>
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
    height: 150,
    width: 150,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "tomato"
  },
  boxText: {
    color: "white",
    fontSize: 16
  }
});
