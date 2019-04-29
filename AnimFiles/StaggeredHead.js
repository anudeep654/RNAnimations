import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Animated,
  PanResponder,
  Text
} from "react-native";
import anudeep from "../images/anudeep.jpg";
export default class StaggeredHead extends React.Component {
  state = {
    heads: [
      {
        image: anudeep,
        animation: new Animated.ValueXY(),
        text: "Drag Me"
      },
      {
        image: anudeep,
        animation: new Animated.ValueXY()
      },
      { image: anudeep, animation: new Animated.ValueXY() }
    ]
  };
  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        this.state.heads.map(({ animation }) => {
          animation.extractOffset();
          animation.setValue({ x: 0, y: 0 });
        });
      },
      onPanResponderMove: (e, { dx, dy }) => {
        this.state.heads[0].animation.setValue({
          x: dx,
          y: dy
        });

        this.state.heads.slice(1).map(({ animation }, index) => {
          Animated.sequence([
            Animated.delay(index * 100),
            Animated.spring(animation, {
              toValue: {
                x: dx,
                y: dy
              }
            })
          ]).start();
        });
      }
    });
  }
  render() {
    const { container, imageContainer } = styles;

    return (
      <View style={container}>
        {this.state.heads
          .slice(0)
          .reverse()
          .map((item, index, items) => {
            const pan =
              index === items.length - 1 ? this._panResponder.panHandlers : {};

            return (
              <Animated.Image
                {...pan}
                key={index}
                source={item.image}
                style={[
                  styles.imageContainer,
                  { transform: item.animation.getTranslateTransform() }
                ]}
              >
                {/* <Text>{item.text}</Text> */}
              </Animated.Image>
            );
          })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  imageContainer: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center"
  }
});
