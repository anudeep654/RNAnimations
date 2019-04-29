import React from "react";
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Animated,
  TouchableWithoutFeedback,
  Text
} from "react-native";

export default class TvDesign extends React.Component {
  state = {
    animation: new Animated.Value(1),
    names: [
      { name: "Ben", id: 1 },
      { name: "Susan", id: 2 },
      { name: "Robert", id: 3 },
      { name: "Mary", id: 4 },
      { name: "Daniel", id: 5 },
      { name: "Laura", id: 6 },
      { name: "John", id: 7 },
      { name: "Debra", id: 8 },
      { name: "Aron", id: 9 },
      { name: "Ann", id: 10 },
      { name: "Steve", id: 11 },
      { name: "Olivia", id: 12 }
    ]
  };

  startAnimation = () => {
    Animated.timing(this.state.animation, {
      toValue: 1.5,
      duration: 500,
      useNativeDriver: true
    }).start();
  };
  endAnimation = () => {
    Animated.timing(this.state.animation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();
  };
  render() {
    const { container, cardStyle, innerContainer, textflip } = styles;

    const scaleImage = {
      transform: [{ scale: this.state.animation }]
    };
    return (
      <View style={container}>
        <ScrollView horizontal>
          <TouchableOpacity
            key={"x"}
            onFocus={this.startAnimation()}
            onBlur={this.endAnimation}
          >
            <Animated.View style={cardStyle} />
          </TouchableOpacity>
          <TouchableOpacity
            key={"y"}
            onFocus={this.startAnimation()}
            onBlur={this.endAnimation}
          >
            <Animated.View style={cardStyle} />
          </TouchableOpacity>
          <TouchableOpacity
            key={"z"}
            onFocus={this.startAnimation()}
            onBlur={this.endAnimation}
          >
            <Animated.View style={cardStyle} />
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 50,

    marginTop: 100
  },
  cardStyle: {
    height: 200,
    width: 150,
    alignItems: "center",
    backgroundColor: "red",
    margin: 2
  },
  cardStyle1: {
    height: 200,
    width: 150,
    alignItems: "center",
    backgroundColor: "black",
    margin: 2
  },

  cardStyle2: {
    height: 200,
    width: 150,
    alignItems: "center",
    backgroundColor: "green",
    margin: 2
  },
  innerContainer: {
    alignItems: "center",
    flexDirection: "row"
  },
  textflip: {
    color: "#fff"
  }
});
