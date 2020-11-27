import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Animated } from 'react-native';
import { FontAwesome5, Feather } from "@expo/vector-icons"


export default class AddButton extends React.Component {

    buttonSize = new Animated.Value(1);
    mode = new Animated.Value(0);

    handlePress = () => {
        Animated.sequence([
            Animated.timing(this.buttonSize, {
                toValue: 0.95,
                duration: 200
            }),
            Animated.timing(this.buttonSize, {
                toValue: 1
            }),
            Animated.timing(this.mode, {
                toValue: this.mode._value === 0 ? 1 : 0
            })
        ]).start();
    };

    render() {
        //boton al medio +
        const sizeStyle = {
            transform: [{ scale: this.buttonSize }]
        };

        const rotation = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: ["-90deg", "0deg"]
        });


        return (
            <View style={{ position: "absolute", alignItems: "center" }}>
                <Animated.View style={[styles.button, sizeStyle]}>
                  
                        <Animated.View style={{ transform: [{ rotate: rotation }] }}>
                            <FontAwesome5 name="leaf" size={24} color="#2ed34f" />
                        </Animated.View>
                 
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#FFF",
        alignItems: "center",
        justifyContent: "center",
        width: 60,
        height: 60,
        borderRadius: 36,
        position: "absolute",
        top: -30,
        shadowColor: "#2ed34f",
        shadowRadius: 5,
        shadowOffset: { height: 10 },
        shadowOpacity: 0.3,
        borderWidth: 5,
        borderColor: "#2ed34f"
    },
   
})
