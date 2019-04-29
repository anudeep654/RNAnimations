import React from "react";
import {View,Text,StyleSheet,Animated,TouchableWithoutFeedback} from "react-native";

export default class Color extends React.Component{

    state  ={
        animation : new Animated.Value(0)
    }

    onStartAnimation = () => {
        Animated.timing(this.state.animation,{
            toValue : 1,
            duration:500
        }).start(() => {
            this.state.animation.setValue(0);
        });
    }
    render(){
        const { container,box} = styles;
        const boxinterpolate = this.state.animation.interpolate({
            inputRange : [0,1],
            outputRange: ["rgb(255,99,71)", "rgb(99,71,255)"]
        });
        const boxStyle = {
            backgroundColor : boxinterpolate
        }
        const textInterpolate = this.state.animation.interpolate({
            inputRange:[0,1],
            outputRange: ["rgb(99,71,255)", "rgb(255,99,71)" ]
        });
        const textStyle = {
            color : textInterpolate
        }

        return(
            <View style ={container}>
                <TouchableWithoutFeedback onPress ={this.onStartAnimation}>
                <Animated.View style ={[box,boxStyle]}>
                    <Animated.Text style={textStyle}>Hello Anudeep!</Animated.Text>
                </Animated.View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    },
    box:{
        width:150,
        height:150,
        backgroundColor:"tomato",
        alignItems:"center",
        justifyContent:"center"
    }
});