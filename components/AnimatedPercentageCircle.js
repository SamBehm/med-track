import Svg, { Circle } from 'react-native-svg';
import Animated, { useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated';
import { useEffect } from 'react';
import { View } from 'react-native';

const AnimCircle = Animated.createAnimatedComponent(Circle);

function AnimatedPercentageCircle(props) {

        const radius = props.radius;
        const circumference = 2 * Math.PI * radius;

        const progress = useSharedValue(0);
        const animProps = useAnimatedProps(() => {
                return {
                        strokeDashoffset: (circumference * progress.value)
                }
        });

        useEffect(() => {
                progress.value = withTiming((1 - props.percent), { duration: 1000 });
        }, []);


        return (
                <View style={props.containerStyle}>
                        <Svg height="85%" width="85%" viewBox='0 0 100 100'>
                                <AnimCircle
                                        animatedProps={animProps}
                                        cx="50"
                                        cy="50"
                                        r={radius}
                                        stroke={props.strokeColor}
                                        strokeWidth={props.strokeWidth}
                                        fill={props.fill}
                                        strokeDasharray={circumference}
                                        strokeDashoffset={circumference}
                                />
                        </Svg>
                </View>
        )
}

export default AnimatedPercentageCircle;