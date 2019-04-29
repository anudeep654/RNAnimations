import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Animated,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback
} from "react-native";
import Icon from "react-native-vector-icons/Foundation";
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
const AnimatedIcon = Animated.createAnimatedComponent(Icon);

export default class ColorPickerAnim extends React.Component {
  state = {
    color: "#000",
    animation: new Animated.Value(0),
    buttonAnimation: new Animated.Value(0),
    inputOpen: false
  };
  handleToggle = () => {
    const toValue = this._open ? 0 : 1;
    Animated.spring(this.state.animation, {
      toValue
    }).start();
    this._open = !this._open;
  };
  toggleInput = () => {
    const toValue = this._topen ? 0 : 1;
    Animated.timing(this.state.buttonAnimation, {
      toValue,
      duration: 350
    }).start();
    this._topen = !this._topen;
    this.setState({ inputOpen: true });
  };
  render() {
    const {
      container,
      button,
      rowStyle,
      colorBall,
      row,
      textInput,
      colorRowWrap,
      okayButton,
      okaytext
    } = styles;
    const toggleColor = {
      backgroundColor: this.state.color
    };
    const translateYAnim = this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [150, 0]
    });

    const scaleXAnim = this.state.animation.interpolate({
      inputRange: [0, 0.6, 1],
      outputRange: [0, 0, 1]
    });
    const rowStyles = {
      opacity: this.state.animation,
      transform: [
        {
          translateY: translateYAnim
        },
        {
          scaleY: this.state.animation
        },
        {
          scaleX: scaleXAnim
        }
      ]
    };

    const translateOkBtn = this.state.buttonAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [-150, 0]
    });
    const okayButtonStyles = {
      transform: [
        {
          translateX: translateOkBtn
        },
        { scale: this.state.buttonAnimation }
      ]
    };

    const colorBtnItnterpolate = this.state.buttonAnimation.interpolate({
      inputRange: [0, 0.01],
      outputRange: [1, 0],
      extrapolate: "clamp"
    });

    const colorBtnOpacity = {
      opacity: colorBtnItnterpolate
    };
    const textInputInterpolate = this.state.buttonAnimation.interpolate({
      inputRange: [0, 0.01],
      outputRange: [0, 1],
      extrapolate: "clamp"
    });

    const textInputAnim = {
      opacity: textInputInterpolate
    };
    const IconInterpolate = this.state.buttonAnimation.interpolate({
      inputRange: [0, 0.01],
      outputRange: [1, 0],
      extrapolate: "clamp"
    });

    const iocnsAnim = {
      opacity: IconInterpolate
    };
    return (
      <View style={container}>
        <Animated.View style={[rowStyle, rowStyles]}>
          <TouchableWithoutFeedback onPress={this.toggleInput}>
            <Animated.View style={[colorBall, toggleColor, colorBtnOpacity]} />
          </TouchableWithoutFeedback>
          <View style={row}>
            <TouchableOpacity>
              <AnimatedIcon
                name="bold"
                size={30}
                color="#555"
                style={iocnsAnim}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <AnimatedIcon
                name="italic"
                size={30}
                color="#555"
                style={iocnsAnim}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <AnimatedIcon
                name="align-center"
                size={30}
                color="#555"
                style={iocnsAnim}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <AnimatedIcon
                name="link"
                size={30}
                color="#555"
                style={iocnsAnim}
              />
            </TouchableOpacity>
            <Animated.View
              style={[StyleSheet.absoluteFill, colorRowWrap]}
              pointerEvents={this.state.inputOpen ? "auto" : "none"}
            >
              <AnimatedTextInput
                style={[textInput, textInputAnim]}
                value={this.state.color}
                onChangeText={color => this.setState({ color })}
              />
              <TouchableOpacity onPress={this.toggleInput}>
                <Animated.View style={[okayButton, okayButtonStyles]}>
                  <Text style={okaytext}>OK</Text>
                </Animated.View>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </Animated.View>

        <TouchableOpacity onPress={this.handleToggle} style={button}>
          <Text>Toggle Open/Closed</Text>
        </TouchableOpacity>
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
  button: {
    marginTop: 50
  },
  colorRowWrap: {
    flex: 1,
    flexDirection: "row"
  },
  okayButton: {
    borderRadius: 20,
    height: "100%",
    width: 40,
    backgroundColor: "#309EEB",
    alignItems: "center",
    justifyContent: "center"
  },
  okaytext: {
    color: "#fff"
  },
  rowStyle: {
    flexDirection: "row",
    alignItems: "center",
    minWidth: "60%",
    backgroundColor: "#FFF",
    borderRadius: 20,
    shadowColor: "#333",
    shadowOpacity: 0.2,
    shadowOffset: { x: 2, y: 2 },
    shadowRadius: 3,
    paddingVertical: 5,
    paddingHorizontal: 10
  },
  colorBall: {
    height: 15,
    width: 15,
    borderRadius: 8
  },
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    overflow: "hidden"
  },
  textInput: {
    flex: 1
  }
});
