import Svg, { Circle, Text } from 'react-native-svg';
import Animated, { useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated';
import { useEffect } from 'react';
import { View } from 'react-native';

const AnimCircle = Animated.createAnimatedComponent(Circle);

function AnimatedPercentageCircle(props) {

        const radius = props.radius;
        const circumference = 2 * Math.PI * radius;
        const viewBox = (2 * radius) + (props.strokeWidth);

        const fontSize = props.fontSize ? props.fontSize : 10;

        const progress = useSharedValue(0);
        const animProps = useAnimatedProps(() => {
                return {
                        strokeDashoffset: (circumference * (1 - progress.value))
                }
        });

        useEffect(() => {
                progress.value = withTiming(props.percent, { duration: 1000 });
        }, [props.percent]);


        return (
                <View style={{ ...props.containerStyle }}>
                        <Svg height="100%" width="100%" viewBox={`0 0 ${viewBox} ${viewBox}`}>
                                {
                                        props.showBackgroundCircle && (
                                                <Circle
                                                        cx={viewBox / 2}
                                                        cy={viewBox / 2}
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
                                        cx={viewBox / 2}
                                        cy={viewBox / 2}
                                        r={radius}
                                        stroke={props.strokeColor}
                                        strokeWidth={props.strokeWidth / 2}
                                        fill={props.fill}
                                        fillOpacity={props.fillOpacity}
                                        strokeLinecap="round"
                                        strokeDasharray={circumference}
                                        transform={{ ...props.transform, originX: viewBox / 2, originY: viewBox / 2 }}
                                />
                                <Text
                                        x={viewBox / 2}
                                        y={(viewBox / 2) + (fontSize / 2) - 1}
                                        stroke="black"
                                        fontSize={fontSize}
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