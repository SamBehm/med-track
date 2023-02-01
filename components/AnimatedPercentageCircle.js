import Svg, { Circle, Text } from 'react-native-svg';
import Animated, { useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated';
import { useEffect } from 'react';
import { View } from 'react-native';

const AnimCircle = Animated.createAnimatedComponent(Circle);

function AnimatedPercentageCircle(props) {

        const radius = props.radius;
        const circumference = 2 * Math.PI * radius;

        const progress = useSharedValue(0);
        const animProps = useAnimatedProps(() => ({
                strokeDashoffset: (circumference * (1 - progress.value))
        }));

        useEffect(() => {
                progress.value = withTiming(props.percent, { duration: 1000 });
        }, []);


        return (
                <View style={props.containerStyle}>
                        <Svg height="85%" width="85%" viewBox='0 0 100 100'>
                                {
                                        props.showBackgroundCircle && (
                                                <Circle
                                                        cx="50"
                                                        cy="50"
                                                        r={radius}
                                                        fill={props.fill}
                                                        fillOpacity={props.fillOpacity}
                                                        stroke={'grey'}
                                                        strokeWidth={props.strokeWidth}
                                                        style={{ opacity: 0.1 }}
                                                />
                                        )
                                }
                                <AnimCircle
                                        animatedProps={animProps}
                                        cx="50"
                                        cy="50"
                                        r={radius}
                                        stroke={props.strokeColor}
                                        strokeWidth={props.strokeWidth / 2}
                                        fill={props.fill}
                                        fillOpacity={props.fillOpacity}
                                        strokeLinecap="round"
                                        strokeDasharray={circumference}
                                        strokeDashoffset={circumference}
                                        transform={{ rotation: -90, originX: 50, originY: 50 }}
                                />
                                <Text
                                        x={50}
                                        y={54}
                                        stroke="black"
                                        fontSize="10"
                                        textAnchor="middle"
                                        fontWeight="1"
                                >
                                        {props.text}
                                </Text>
                        </Svg>
                </View>
        )
}

export default AnimatedPercentageCircle;