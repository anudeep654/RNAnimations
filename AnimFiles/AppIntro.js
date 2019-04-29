import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  Image,
  ScrollView,
  Animated,
  PixelRatio
} from "react-native";

import * as Images from "../Images";

const getScreen1Styles = (width, animation) => {
  const image1style = animation.interpolate({
    inputRange: [0, width],
    outputRange: [0, -100],
    extraPolate: "clamp"
  });

  return {
    image1: {
      transform: [{ translateX: image1style }]
    }
  };
};
const getScreen2Styles = (width, animation) => {
  const inputRange = [0, width, width * 2];

  const image2TranslateY = animation.interpolate({
    inputRange,
    outputRange: [100, 0, -100],
    extrapolate: "clamp"
  });
  const image2Opacity = animation.interpolate({
    inputRange,
    outputRange: [0, 1, 0],
    extrapolate: "clamp"
  });

  return {
    image2: {
      opacity: image2Opacity,
      transform: [
        {
          translateY: image2TranslateY
        }
      ]
    }
  };
};
const getScreen3Styles = (width, animation) => {
  const inputRange = [width, width * 2, width * 3];

  const image1Scale = animation.interpolate({
    inputRange,
    outputRange: [0, 1, 0],
    extrapolate: "clamp"
  });

  const image2Rotate = animation.interpolate({
    inputRange,
    outputRange: ["-180deg", "0deg", "180deg"],
    extrapolate: "clamp"
  });

  return {
    image1: {
      transform: [
        {
          scale: image1Scale
        }
      ]
    },
    image2: {
      transform: [
        {
          scale: image1Scale
        },
        {
          rotate: image2Rotate
        }
      ]
    }
  };
};
export default class AppIntro extends React.Component {
  state = {
    animation: new Animated.Value(0)
  };
  render() {
    const { width, height } = Dimensions.get("window");
    const { container, screenHeader, screenText } = styles;
    const screen1Styles = getScreen1Styles(width, this.state.animation);
    const screen2Styles = getScreen2Styles(width, this.state.animation);
    const screen3Styles = getScreen3Styles(width, this.state.animation);
    return (
      <View style={container}>
        <ScrollView
          style={{ container }}
          pagingEnabled
          horizontal
          scrollEventThrottle={16}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  x: this.state.animation
                }
              }
            }
          ])}
        >
          <View style={{ width, height, backgroundColor: "#F89E20" }}>
            <View style={screenHeader}>
              <Animated.Image
                source={Images.Image1}
                resizeMode="contain"
                style={{
                  width: PixelRatio.getPixelSizeForLayoutSize(75),
                  height: PixelRatio.getPixelSizeForLayoutSize(63)
                }}
              />
              <Animated.Image
                source={Images.Image2}
                resizeMode="contain"
                style={[
                  {
                    width: PixelRatio.getPixelSizeForLayoutSize(46),
                    height: PixelRatio.getPixelSizeForLayoutSize(28),
                    position: "absolute",
                    top: 200,
                    left: 60
                  },
                  screen1Styles.image1
                ]}
              />
              <Animated.Image
                source={Images.Image3}
                resizeMode="contain"
                style={{
                  width: PixelRatio.getPixelSizeForLayoutSize(23),
                  height: PixelRatio.getPixelSizeForLayoutSize(17),
                  position: "absolute",
                  top: 150,
                  left: 60
                }}
              />
            </View>

            <View style={screenText}>
              <Text>Screen1</Text>
            </View>
          </View>
          <View style={{ width, height, backgroundColor: "#F89E20" }}>
            <View style={styles.screenHeader}>
              <Animated.Image
                source={Images.Image1}
                style={[
                  {
                    width: PixelRatio.getPixelSizeForLayoutSize(75),
                    height: PixelRatio.getPixelSizeForLayoutSize(63)
                  }
                ]}
                resizeMode="contain"
              />

              <Animated.Image
                source={Images.Image2}
                style={[
                  {
                    width: PixelRatio.getPixelSizeForLayoutSize(46),
                    height: PixelRatio.getPixelSizeForLayoutSize(28),
                    position: "absolute",
                    top: 200,
                    left: 60
                  },
                  screen2Styles.image2
                ]}
                resizeMode="contain"
              />
              <Animated.Image
                source={Images.Image3}
                style={{
                  width: PixelRatio.getPixelSizeForLayoutSize(23),
                  height: PixelRatio.getPixelSizeForLayoutSize(17),
                  position: "absolute",
                  top: 150,
                  left: 60
                }}
                resizeMode="contain"
              />
            </View>
            <View style={styles.screenText}>
              <Text>Screen 2</Text>
            </View>
          </View>
          <View style={{ width, height, backgroundColor: "#F89E20" }}>
            <View style={styles.screenHeader}>
              <Animated.Image
                source={Images.Image1}
                style={[
                  {
                    width: PixelRatio.getPixelSizeForLayoutSize(75),
                    height: PixelRatio.getPixelSizeForLayoutSize(63)
                  }
                  //  screen3Styles.image1
                ]}
                resizeMode="contain"
              />

              <Animated.Image
                source={Images.Image2}
                style={[
                  {
                    width: PixelRatio.getPixelSizeForLayoutSize(46),
                    height: PixelRatio.getPixelSizeForLayoutSize(28),
                    position: "absolute",
                    top: 200,
                    left: 60
                  },
                  screen3Styles.image2
                ]}
                resizeMode="contain"
              />
              <Animated.Image
                source={Images.Image3}
                style={{
                  width: PixelRatio.getPixelSizeForLayoutSize(23),
                  height: PixelRatio.getPixelSizeForLayoutSize(17),
                  position: "absolute",
                  top: 150,
                  left: 60
                }}
                resizeMode="contain"
              />
            </View>
            <View style={styles.screenText}>
              <Text>Screen 3</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  screenHeader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  screenText: {
    flex: 1
  }
});
