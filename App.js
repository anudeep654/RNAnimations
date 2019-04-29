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
export default class App extends Component<Props> {

    state =  {
      animation : new Animated.Value(1)
    }

  onCall =() => {
    Animated.timing(this.state.animation,{
      toValue : 0,
      duration:350
    }).start(() => {
      Animated.timing(this.state.animation,{
        toValue : 1,
        duration:350
      }).start();
    });
  }
  render() {
const animatedStyles = {
  opacity : this.state.animation
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
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
