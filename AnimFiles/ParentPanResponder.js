import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  PanResponder,
  Dimensions
} from "react-native";
const { width, height } = Dimensions.get("window");
export default class ParentPanResponder extends React.Component {
  state = {
    zone: "still touchable"
  };

  onPress = () => {
    this.setState({
      zone: "I got touched with a parent pan responder"
    });
  };

  getDirectionAndColor = ({moveX, moveY, dx, dy}) => {
    const draggedLeft = dx < -30;
    const draggedRight = dx > 30;
    const draggedUp = dy < -30;
    const draggedDown = dy > 30;

    const isRed = moveX > 0 && moveX < width && moveY > 40 && moveY < 90;
    const isBlue = moveX > 0 && moveX < width && moveY > height - 50;
    let dragDirection = "";

    if (draggedLeft || draggedRight) {
      if (draggedLeft) dragDirection += "dragged Left";
      if (draggedRight) dragDirection += "dragged Right";
    }
    if(draggedUp || draggedDown){
      if(draggedUp) dragDirection += "dragged up";
      if(draggedDown) dragDirection +="dragged down";
    }
      if(isRed) return `red ${dragDirection}` ;
      if(isBlue) return `blue ${dragDirection}`;
      if(dragDirection) return dragDirection;
  };

  componentWillMount() {
    this._panResponders = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        const direction = this.getDirectionAndColor(gestureState);
        this.setState({
            zone:direction
        })
      }
    });
  }

  render() {
    const { container, innertext, zone1, zone2 } = styles;
    return (
      <View style={container} {...this._panResponders.panHandlers}>
        <View style={zone1} />
        <View style={innertext}>
          <TouchableOpacity onPress={this.onPress}>
            <Text>{this.state.zone}</Text>
          </TouchableOpacity>
        </View>
        <View style={zone2} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  innertext: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  zone1: {
    top: 40,
    left: 0,
    right: 0,
    bottom: 0,
    height: 50,
    position: "absolute",
    backgroundColor: "red"
  },
  zone2: {
    left: 0,
    right: 0,
    bottom: 0,
    height: 50,
    position: "absolute",
    backgroundColor: "blue"
  }
});
