import { View } from "react-native";
import { Circle, G, Line, Svg } from "react-native-svg";


function LineChart(props) {

        const dataSet = [...props.data];
        const paddingX = 1;
        const paddingY = 30;
        const viewBox = {
                x: 300,
                y: 150
        }

        let dataPoints = [];
        const xIntervalSize = ((viewBox.x - paddingX) / dataSet.length);
        dataSet.forEach((element, index) => {

                let x = (xIntervalSize * index) + (paddingX / 2) + (xIntervalSize / 2);
                let y = (element / props.maxYValue) * (viewBox.y - paddingY) + (paddingY / 2);
                dataPoints.push({ x: x, y: y });
        });

        let connectingLines = [];
        dataPoints.forEach((element, index) => {
                connectingLines.push(
                        <Line
                                key={index}
                        />
                )
        });



        return (
                <View style={props.containerStyle}>
                        <Svg height="100%" width="100%" viewBox={`0 0 ${viewBox.x} ${viewBox.y}`}>
                                <Line
                                        x1="0"
                                        y1={`0`}
                                        x2={`0`}
                                        y2={`${viewBox.y}`}
                                        stroke={props.axisColor}
                                        strokeWidth="3"
                                />
                                <Line
                                        x1="0"
                                        y1={`${viewBox.y}`}
                                        x2={`${viewBox.x}`}
                                        y2={`${viewBox.y}`}
                                        stroke={props.axisColor}
                                        strokeWidth="3"
                                />
                                <G>
                                        {dataPoints.map((value, index) => {
                                                return (
                                                        <Circle
                                                                key={index}
                                                                cx={`${value.x}`}
                                                                cy={`${value.y}`}
                                                                r={`${props.pointRadius}`}
                                                                stroke={props.pointColor}
                                                                strokeWidth={'2'}
                                                        />
                                                )
                                        })}
                                </G>
                        </Svg>
                </View>
        )

}

export default LineChart;