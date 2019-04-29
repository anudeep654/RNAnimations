import React from "react";
import {View,Text,StyleSheet,Animated,TouchableWithoutFeedback} from "react-native";

export default class Rotate extends React.Component{

    state  ={
        animation : new Animated.Value(0)
    }

    onStartAnimation = () => {
        Animated.timing(this.state.animation,{
            toValue : 360,
            duration:500
        }).start(() => {
            this.state.animation.setValue(0);
        });
    }
    render(){
        const { container,box} = styles;
        const boxinterpolate = this.state.animation.interpolate({
             inputRange: [0, 360],
      outputRange: ["0deg", "360deg"],
      
        });
        const boxStyle = {
            transform : [
                {
                    rotate: boxinterpolate
                }
            ]
        }
     
        return(
            <View style ={container}>
                <TouchableWithoutFeedback onPress ={this.onStartAnimation}>
                <Animated.View style ={[box,boxStyle]}>
                    <Animated.Text >Hello Anudeep!</Animated.Text>
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