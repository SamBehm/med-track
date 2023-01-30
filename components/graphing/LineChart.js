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
                let y = viewBox.y - ((element / props.maxYValue) * (viewBox.y - paddingY)) - (paddingY / 2);
                dataPoints.push({ x: x, y: y });
        });

        let connectingLines = [];
        for (let i = 1; i < dataPoints.length; i++) {
                const p1 = dataPoints[i - 1];
                const p2 = dataPoints[i];

                const dx = p2.x - p1.x;
                const dy = p2.y - p1.y;
                const theta = Math.atan(dy / dx);

                const ry = (props.pointRadius * Math.sin(theta));
                const rx = (props.pointRadius * Math.cos(theta));

                const x1 = p1.x + rx;
                const y1 = p1.y + ry;

                const x2 = p2.x - rx;
                const y2 = p2.y - ry;

                connectingLines.push(
                        <Line
                                key={i - 1}
                                x1={`${x1}`}
                                y1={`${y1}`}
                                x2={`${x2}`}
                                y2={`${y2}`}
                                stroke={props.lineColor}
                                strokeWidth="1"
                        />
                )
        };



        return (
                <View style={props.containerStyle}>
                        <Svg height="100%" width="100%" viewBox={`0 0 ${viewBox.x} ${viewBox.y}`}>
                                <Line
                                        x1="0"
                                        y1={`${viewBox.y}`}
                                        x2={`${viewBox.x}`}
                                        y2={`${viewBox.y}`}
                                        stroke={props.axisColor}
                                        strokeWidth="2"
                                        style={{ opacity: 0.5 }}
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
                                <G>
                                        {connectingLines}
                                </G>
                                {
                                        props.horizontalGridLines &&
                                        generateHorizontalGridLines(props.horizontalGridLines, viewBox, paddingX, props.axisColor)
                                }
                        </Svg>
                </View>
        )

}

function generateHorizontalGridLines(numLines, viewBox, paddingX, axisColor) {
        let interval = viewBox.y / numLines;
        let lines = [];
        for (let i = 1; i <= numLines; i++) {
                let y = `${i * interval}`;
                lines.push(
                        <Line
                                key={i - 1}
                                x1={`${paddingX}`}
                                x2={`${viewBox.x + paddingX}`}
                                y1={y}
                                y2={y}
                                stroke={axisColor}
                                strokeWidth={'1'}
                                style={{ opacity: 0.2 }}
                        />
                )
        }
        return lines;
}

export default LineChart;