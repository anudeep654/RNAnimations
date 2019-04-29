import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  ScrollView
} from "react-native";
export default class Event extends React.Component {
  state = {
    animation: new Animated.Value(0)
  };

  render() {
    const colorInterpolate = this.state.animation.interpolate({
        inputRange :[0,3000],
        outputRange:["rgb(255,99,71)", "rgb(99,71,255)"]
    });

    const boxColor = {
        backgroundColor : colorInterpolate
    }

    return (
        <View style={styles.container}>
          <ScrollView 
            scrollEventThrottle ={16}
            // onScroll= {(e) => {
            //     this.state.animation.setValue(e.nativeEvent.contentOffset.y)
            // }}
            onScroll = {Animated.event([
                {
                    nativeEvent : {
                        contentOffset :{
                            y :  this.state.animation
                        }
                    }
                }
            ])}
          >
            <Animated.View style={[styles.content,boxColor]} />
          </ScrollView>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
    
  },
  content: {
    height: 3000,
   
  }
});
