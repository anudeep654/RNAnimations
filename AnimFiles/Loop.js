import React from "react";
import {View,Text,StyleSheet,Animated,TouchableWithoutFeedback} from "react-native";
var i =0;
export default class Loop extends React.Component{
   
    state  ={
        animation : new Animated.Value(0)
    }

    onStartAnimation = () => {
        this.state.animation.addListener(({ value }) => {
            console.log(value);
          });
        Animated.loop(Animated.timing(this.state.animation,{
            toValue : 1,
            duration:1500,
           
        }),{ iterations:2}).start();
    }
    render(){
        const { container,box} = styles;
        const boxinterpolate = this.state.animation.interpolate({
             inputRange: [0, 1],
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