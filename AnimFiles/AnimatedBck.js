import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions
} from "react-native";

export default class DynamicNoti extends React.Component {
  state = {
    index: 0,
    questions: [
      "Do you tend to follow directions when given?",
      "Are you comfortable with the idea of standing and doing light physical activity most of the day?",
      "Would you enjoy making sure your customers leave happy?",
      "Are you willing to work nights and weekends (and possibly holidays)?"
    ],
    animation: new Animated.Value(0),
    progress: new Animated.Value(0)
  };
  handleAnswer = () => {
    Animated.parallel([
      Animated.timing(this.state.progress, {
        toValue: this.state.index + 1,
        duration: 400
      }),
      Animated.timing(this.state.animation, {
        toValue: 1,
        duration: 400
      })
    ]).start(() => {
      this.setState(
        state => {
          return {
            index: state.index + 1
          };
        },
        () => {
          this.state.animation.setValue(0);
        }
      );
    });
  };

  handleClear = () => {
    this.state.animation.setValue(0);
    this.state.progress.setValue(0);
    this.setState({
      index: 0
    });
  };
  render() {
    const {
      container,
      optionText,
      optionsContainer,
      close,
      closeText,
      questionsContainer,
      overlay,
      questionText,
      yes,
      bar,
      progress,
      nextquestionContainer
    } = styles;
    const { index, questions } = this.state;
    const { width } = Dimensions.get("window");
    const nextquestionTextAnim = this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [width, 0]
    });
    const mainQustAnim = this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -width]
    });

    const mainqustnStyle = {
      transform: [
        {
          translateX: mainQustAnim
        }
      ]
    };
    const nextQustnStyle = {
      transform: [
        {
          translateX: nextquestionTextAnim
        }
      ]
    };

    const progressAnim = this.state.progress.interpolate({
      inputRange: [0, questions.length - 1],
      outputRange: ["0%", "100%"]
    });

    const progressStyle = {
      width: progressAnim
    };

    const question = questions[index];
    let nextQuestion;
    if (index + 1 < questions.length) {
      nextQuestion = questions[index + 1];
    }

    return (
      <View style={container}>
        <View style={[overlay, StyleSheet.absoluteFill]}>
          <View style={questionsContainer}>
            <Animated.Text style={[questionText, mainqustnStyle]}>
              {question}
            </Animated.Text>
            <Animated.Text style={[questionText, nextQustnStyle]}>
              {nextQuestion}
            </Animated.Text>
          </View>
        </View>
        <View style={[progress]}>
          <Animated.View style={[bar, progressStyle]} />
        </View>
        <TouchableOpacity
          onPress={this.handleAnswer}
          activeOpacity={0.7}
          style={optionsContainer}
        >
          <Text style={optionText}>No</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.handleAnswer}
          activeOpacity={0.7}
          style={yes}
        >
          <Text style={optionText}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={close} onPress={this.handleClear}>
          <Text style={closeText}>X</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E22D4B",
    flexDirection: "row"
  },
  overlay: {
    alignItems: "center",
    justifyContent: "center"
  },
  progress: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 10
  },
  bar: {
    height: "100%",
    backgroundColor: "#fff"
  },
  questionsContainer: {
    width: "100%",
    height: 100
  },
  questionText: {
    fontSize: 30,
    position: "absolute",
    color: "#fff",
    textAlign: "center",
    left: 0,
    right: 0
  },

  optionsContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end"
  },
  optionText: {
    fontSize: 30,
    color: "#FFF",
    marginBottom: 50
  },
  close: {
    position: "absolute",
    top: 30,
    right: 30
  },
  closeText: {
    color: "#fff",
    fontSize: 28,
    backgroundColor: "transparent"
  },
  yes: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "rgba(255,255,255,.1)"
  }
});
