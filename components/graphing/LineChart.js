import { View } from "react-native";
import { Circle, G, Line, Svg, Text } from "react-native-svg";


function LineChart(props) {

        const dataSet = [...props.data];

        const paddingX = 50;
        const paddingY = {
                top: 10,
                bottom: 30
        };
        const viewBox = {
                x: 300,
                y: 150
        }

        const fontSize = 9;

        let dataPoints = [];
        const xIntervalSize = ((viewBox.x - paddingX) / dataSet.length);
        dataSet.forEach((element, index) => {

                let x = (xIntervalSize * index) + (paddingX / 2) + (xIntervalSize / 2);
                let y = viewBox.y - ((element / props.maxYValue) * (viewBox.y - (paddingY.top + paddingY.bottom))) - paddingY.bottom;
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
                                {
                                        props.horizontalGridLines &&
                                        generateHorizontalGridLines(props.horizontalGridLines, viewBox, paddingX, paddingY, props.axisColor, fontSize)
                                }
                                {props.enableAxis && <Line
                                        x1="0"
                                        y1={`${viewBox.y}`}
                                        x2={`${viewBox.x}`}
                                        y2={`${viewBox.y}`}
                                        stroke={props.axisColor}
                                        strokeWidth="2"
                                        style={{ opacity: 0.5 }}
                                />}
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
                                <G>
                                        {
                                                props.yAxisLabels && props.yAxisLabels && props.yAxisLabels.map((value, index) => {
                                                        let interval = (viewBox.y - (paddingY.top + paddingY.bottom)) / (props.yAxisLabels.length - 1);
                                                        let y = viewBox.y - (interval * index) - paddingY.bottom + (fontSize / 3);

                                                        return (
                                                                <Text
                                                                        key={index}
                                                                        x={7}
                                                                        y={y}
                                                                        fill="grey"
                                                                        fontSize={`${fontSize}`}
                                                                        textAnchor="start"
                                                                >
                                                                        {value}
                                                                </Text>
                                                        );
                                                })
                                        }
                                </G>
                                <G>
                                        {
                                                props.xAxisLabels && props.xAxisLabels && props.xAxisLabels.map((value, index) => {
                                                        let interval = ((viewBox.x - paddingX) / props.xAxisLabels.length);
                                                        let x = (interval * index) + (paddingX / 2) + (interval / 2);
                                                        return (
                                                                <Text
                                                                        key={index}
                                                                        x={x}
                                                                        y={viewBox.y}
                                                                        fill="grey"
                                                                        stroke="grey"
                                                                        fontSize="10"
                                                                        textAnchor="middle"
                                                                >
                                                                        {value}
                                                                </Text>
                                                        );
                                                })
                                        }
                                </G>
                        </Svg>
                </View>
        )

}

function generateHorizontalGridLines(numLines, viewBox, paddingX, paddingY, axisColor, fontSize) {
        let interval = (viewBox.y - (paddingY.top + paddingY.bottom)) / (numLines - 1);
        let lines = [];
        for (let i = 0; i < numLines; i++) {
                let y = viewBox.y - (interval * i) - paddingY.bottom;
                lines.push(
                        <Line
                                key={i - 1}
                                x1={`${paddingX / 2 + fontSize}`}
                                x2={`${viewBox.x - (paddingX / 2)}`}
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