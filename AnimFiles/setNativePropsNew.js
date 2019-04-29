import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions,
  Animated
} from "react-native";
export default class SetNativeProps extends React.Component {
  _enabled = true;
  state = {
    animated: new Animated.Value(0)
  };

  onHandleTogglePress = () => {
    this._enabled = !this._enabled;

    let style = [styles.scrollBox];
    !this._enabled == true ? style.push(styles.hide) : style.push(styles.show);
    this._scrollref.setNativeProps({
      scrollEnabled: this._enabled,
      style
    });
  };

  render() {
    const { container, scrollBox, fakeContent } = styles;
    const scrollInterpolate = this.state.animated.interpolate({
      inputRange: [0, 3000],
      outputRange: ["rgb(255,99,71)", "rgb(99,71,255)"]
    });
    const scrollBackgroundStyle = {
      backgroundColor: scrollInterpolate
    };
    return (
      <View style={container}>
        <TouchableOpacity onPress={this.onHandleTogglePress}>
          <Text>Toggle</Text>
        </TouchableOpacity>
        <ScrollView
          style={scrollBox}
          scrollEventThrottle={16}
          ref={scrollref => {
            this._scrollref = scrollref;
          }}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  y: this.state.animated
                }
              }
            }
          ])}
        >
          <Animated.View style={[fakeContent, scrollBackgroundStyle]} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollBox: {
    flex: 1,
    opacity: 1
  },
  fakeContent: {
    height: 3000,
    backgroundColor: "tomato"
  },
  hide: {
    opacity: 0
  },
  show: {
    opacity: 1
  }
});
