import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TextInput,
  Button,
  TouchableOpacity
} from "react-native";

export default class DynamicNoti extends React.Component {
  state = {
    value: "",
    notification: "",
    opacity: new Animated.Value(0),
    offset: new Animated.Value(0)
  };

  render() {
    const {
      container,
      notificationView,
      notificationText,
      buttonStyle,
      textStyle
    } = styles;

    const notificationStyle = {
      opacity: this.state.opacity,
      transform: [
        {
          translateY: this.state.offset
        }
      ]
    };

    return (
      <View style={container}>
        <Animated.View style={[notificationView, notificationStyle]}>
          <View ref={notification => (this._notification = notification)}>
            <Text style={notificationText}>{this.state.value}</Text>
          </View>
        </Animated.View>
        <View>
          <TextInput
            style={textStyle}
            onChangeText={value => {
              this.setState({ value });
            }}
          />

          <TouchableOpacity onPress={this.handlePress}>
            <View style={buttonStyle}>
              <Text style={{ color: "#fff" }}>Show Notification</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
handlePress = () => {
  this.setState({ value: "", notification: this.state.value }, () => {
    this._notification
      .getNode()
      .measure((x, y, width, height, pageX, pageY) => {
        this.state.offset.setValue(height * -1);
        Animated.sequence([
          Animated.parallel([
            Animated.timing(this.state.opacity, {
              toValue: 1,
              duration: 300
            }),
            Animated.timing(this.state.offset, {
              toValue: 1,
              duration: 300
            }),
            Animated.delay(1500),
            Animated.timing(this.state.opacity, {
              toValue: 0,
              duration: 300
            }),
            Animated.timing(this.state.offset, {
              toValue: height * -1,
              duration: 300
            })
          ])
        ]).start();
      });
  });
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  notificationView: {
    position: "absolute",
    paddingHorizontal: 7,
    paddingVertical: 15,
    backgroundColor: "tomato",
    top: 0,
    left: 0,
    right: 0
  },
  notificationText: {
    color: "#fff"
  },
  buttonStyle: {
    backgroundColor: "tomato",
    padding: 15,
    marginTop: 10,
    alignItems: "center"
  },
  textStyle: {
    width: 250,
    height: 40,
    padding: 5,
    borderWidth: 1,
    borderColor: "#ccc"
  }
});
