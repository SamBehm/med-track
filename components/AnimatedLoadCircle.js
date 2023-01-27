import { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";


function AnimatedLoadCircle(props) {

        const progress = new Animated.Value(0);

        Animated.loop(
                Animated.timing(progress, {
                        toValue: 1,
                        useNativeDriver: true,
                        easing: Easing.linear,
                        duration: 2000,
                })
        ).start();

        const spin = progress.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg']
        });


        return (
                <Animated.View
                        style={{
                                width: props.diameter,
                                height: props.diameter,
                                borderRadius: props.diameter / 2,
                                borderWidth: 2,
                                borderColor: "white",
                                borderTopColor: "#4bee9a",
                                borderRightColor: "#4bee9a",
                                transform: [{ rotate: spin }]
                        }}>

                </Animated.View>
        );

}

export default AnimatedLoadCircle;