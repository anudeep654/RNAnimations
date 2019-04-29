import React from "react";
import { View, Text, StyleSheet,Animated,TouchableWithoutFeedback,Easing } from "react-native";

export default class Easin extends React.Component {
    state ={
        animation :new Animated.Value(0)
    }
    onStartAnimation=() => {
        Animated.timing(this.state.animation,{
            toValue:400,
            duration:1000,
            easing:Easing.bezier(.06,1,.86,.23)
        }).start();
    }
  render() {
     
    const { container, boxContainer } = styles;
    const boxAnimate = {
        transform : [
            {
                translateY:this.state.animation
            }
        ]
    }
    return (
      <View style={container} >
      <TouchableWithoutFeedback  onPress={this.onStartAnimation}>
        <Animated.View style={[boxContainer,boxAnimate]}>
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
    justifyContent: "flex-start"
  },
  boxContainer: {
    width: 150,
    height: 150,
    backgroundColor: "tomato"
  }
});
