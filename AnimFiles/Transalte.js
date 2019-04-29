/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TouchableWithoutFeedback,Animated} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class Transalte extends Component<Props> {

    state =  {
      animation : new Animated.Value(0)
    }

  onCall =() => {
    // Animated.timing(this.state.animation,{
    //   toValue : 300,
    //   duration:400
    // }).start(() => {
    //     Animated.timing(this.state.animation,{
    //         toValue : 0,
    //         duration:500
    //       }).start(() => {
    //         Animated.timing(this.state.animation,{
    //             toValue : 300,
    //             duration:600
    //           }).start(() => {
    //             Animated.timing(this.state.animation,{
    //                 toValue : 50,
    //                 duration:700
    //               }).start();
    //           });
    //       });
    // })
    Animated.timing(this.state.animation,{
        toValue : 200,
        duration : 500
    }).start();
  }
  render() {
const animatedStyles = {
    transform : [
        {translateX: this.state.animation},
        {translateY: this.state.animation}
    ]
}

    return (
      <View style={styles.container}>
      <TouchableWithoutFeedback onPress ={this.onCall}>
          <Animated.View style ={[styles.box,animatedStyles]}>
          </Animated.View>
</TouchableWithoutFeedback>
         
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
   
   
  },
  box: {
    height: 150,
    width:150,
    backgroundColor: 'tomato',
  
//borderRadius:150/2
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
