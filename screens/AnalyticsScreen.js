import { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import AnimatedLoadCircle from "../components/AnimatedLoadCircle";
import AnimatedPercentageCircle from "../components/AnimatedPercentageCircle";
import LineChart from "../components/graphing/LineChart";
import { medStatusOfDate } from "../libs/localStorageHandler/localStorage";


class AnalyticsScreen extends Component {
        constructor(props) {
                super(props);

                this.state = {
                        date: new Date(),
                        monthData: null,
                        awaitingIO: true,
                }

                this._getMonthData = this._getMonthData.bind(this);
        }

        componentDidMount() {
                let promises = this._getMonthData();
                Promise.all(promises).then((values) => {
                        this.setState({
                                monthData: values,
                                awaitingIO: false
                        })
                });
        }

        render() {
                let averageDosageTimesPerDay, averageDosageTime, averageDosageTimeString, dayConsistencies, maxConsistencyIndex;
                if (this.state.monthData) {
                        averageDosageTimesPerDay = averageTimeTakenPerDay(this.state.monthData, this.state.date);
                        let nonZeroCount = 0;
                        let sumDosageTime = (averageDosageTimesPerDay.reduce(
                                (sum, current) => {
                                        if (current > 0) {
                                                nonZeroCount++;
                                                return sum + current;
                                        }
                                        return sum
                                }
                        ));

                        averageDosageTime = nonZeroCount > 0 ? sumDosageTime / nonZeroCount : 0;

                        let averageDosageTimeHours = (Math.floor(averageDosageTime) % 12) || 12;
                        let averageDosageTimeMinutes = Math.floor(60 * (averageDosageTime - Math.floor(averageDosageTime)));
                        averageDosageTimeString = `${averageDosageTimeHours}:` +
                                `${averageDosageTimeMinutes < 10 ? '0' + averageDosageTimeMinutes : averageDosageTimeMinutes} ` +
                                `${averageDosageTime > 12 ? 'pm' : 'am'}`;

                        dayConsistencies = getDayConsistency(this.state.monthData, this.state.date);
                        maxConsistencyIndex = indexOfMax(dayConsistencies);
                        console.log(dayNames[maxConsistencyIndex]);

                }


                return (
                        <View style={[styles.container, { marginVertical: "10%", marginHorizontal: "5%" }]}>
                                <View style={[styles.graphContainer, styles.statContainer]}>
                                        <View style={{ alignSelf: "baseline" }}>
                                                <Text style={{ fontSize: 23, fontWeight: "bold" }}>Daily Dosage Time</Text>
                                                <Text style={{ fontSize: 15, opacity: 0.5 }}>This Month</Text>
                                        </View>

                                        {this.state.monthData
                                                ? <LineChart
                                                        containerStyle={{ flex: 2, width: "100%", maxHeight: "50%" }}
                                                        lineColor={"grey"}
                                                        pointColor={"#4bee9a"}
                                                        pointRadius={5}
                                                        data={averageDosageTimesPerDay}
                                                        maxYValue={24}
                                                        xAxisLabels={dayNames.map(x => x[0])}
                                                        // yAxisLabels={[...Array(12).keys()].map((value) => { return `${value * 2}` })}
                                                        yAxisLabels={["12am", "12pm", "12am"]}
                                                        axisColor="grey"
                                                        horizontalGridLines={6}
                                                />
                                                : (
                                                        <View style={{ flex: 1, justifyContent: "center" }}>
                                                                <AnimatedLoadCircle diameter={75} />
                                                        </View>
                                                )
                                        }
                                        <View style={[styles.horizontalContainer, { flex: 1 }]}>
                                                <View style={{ flex: 1, justifyContent: "center" }}>
                                                        <Text style={{ flexShrink: 1, fontSize: 20 }}>Average Dosage Time</Text>
                                                        <AnimatedPercentageCircle
                                                                radius={30}
                                                                containerStyle={{ flex: 4, alignItems: "baseline" }}
                                                                strokeWidth={5}
                                                                strokeColor={"#4bee9a"}
                                                                fill={"white"}
                                                                fillOpacity={"0"}
                                                                percent={averageDosageTime == null ? 0 : (averageDosageTime / 12)}
                                                                text={averageDosageTimeString}
                                                                showBackgroundCircle={true}
                                                                transform={{ rotation: -90 }}
                                                        />
                                                </View>
                                                <View style={{ flex: 1 }}>
                                                        <Text style={{ flexShrink: 1, fontSize: 20 }}>Most Consistent Day</Text>
                                                        <AnimatedPercentageCircle
                                                                radius={30}
                                                                containerStyle={{ flex: 4, alignItems: "baseline" }}
                                                                strokeWidth={5}
                                                                strokeColor={"#4bee9a"}
                                                                fill={"white"}
                                                                fillOpacity={"0"}
                                                                percent={maxConsistencyIndex == null ? 0 : dayConsistencies[maxConsistencyIndex]}
                                                                text={maxConsistencyIndex == null || maxConsistencyIndex < 0
                                                                        ? '...'
                                                                        : `${dayNames[maxConsistencyIndex].substring(0, 3)} ${dayConsistencies[maxConsistencyIndex] * 100}%`
                                                                }
                                                                showBackgroundCircle={true}
                                                                transform={{ rotation: -90 }}
                                                        />
                                                </View>
                                        </View>
                                </View>
                                <View style={[styles.container, styles.horizontalContainer]}>
                                        <View style={[styles.container, styles.statContainer, { marginRight: "2%" }]}>

                                        </View>
                                        <View style={[styles.container, styles.statContainer, { marginLeft: "2%" }]}>

                                        </View>
                                </View>
                        </View>
                )
        }

        _getMonthData() {
                const month = this.state.date.getMonth();
                const year = this.state.date.getFullYear();
                const lastDate = (new Date(year, month + 1, 0)).getDate();

                let promises = [];
                for (let date = 1; date <= lastDate; date++) {
                        promises.push(medStatusOfDate(new Date(year, month, date)));
                }

                return promises;
        }

}

function indexOfMax(array) {
        if (!array || array.length == 0) {
                return -1;
        }

        let maxIndex = 0;
        let maxValue = 0;
        for (let i = 0; i < array.length; i++) {
                if (array[i] > maxValue) {
                        maxIndex = i;
                        maxValue = array[i];
                }
        }

        return maxIndex;
}

function getDayConsistency(data, date) {
        let consistencies = Array(7);

        let newDate = new Date(date.getFullYear(), date.getMonth(), 1);
        let sundayOffset = newDate.getDay();

        for (let dayNum = 0; dayNum < 7; dayNum++) {
                let numDaysCompleted = 0;
                let numDaysTotal = 0;

                for (let i = dayNum; i < data.length; i += 7) {
                        numDaysTotal++;
                        if (data[i] == null) {
                                continue;
                        }

                        numDaysCompleted++;
                }

                consistencies[(sundayOffset + dayNum) % 7] = numDaysCompleted / numDaysTotal;
        }

        return consistencies;
}

function averageTimeTakenPerDay(data, date) {
        let averages = Array(7);

        let newDate = new Date(date.getFullYear(), date.getMonth(), 1);
        let sundayOffset = newDate.getDay();

        for (let dayNum = 0; dayNum < 7; dayNum++) {
                let total = 0; // total time in minutes
                let count = 0; // number of non-null 

                for (let i = dayNum; i < data.length; i += 7) {
                        if (data[i] == null) {
                                continue;
                        }
                        let splitTime = data[i].split(":"); // [hours, minutes] -> string array
                        total += (parseInt(splitTime[0]) * 60) + parseInt(splitTime[1]);
                        count++;
                }

                if (count == 0) {
                        averages[(sundayOffset + dayNum) % 7] = 0;
                        continue;
                }

                let average = (total / count);

                averages[(sundayOffset + dayNum) % 7] = average / 60;
        }

        return averages;
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
                justifyContent: "center",
        },
        graphContainer: {
                flex: 4,
                justifyContent: "flex-start",
                alignItems: "center",
                marginBottom: "4%",
                padding: "5%"
        },
        horizontalContainer: {
                flex: 3,
                flexDirection: "row",
                justifyContent: "space-between",
        },
        statContainer: {
                borderRadius: 10,
                backgroundColor: "white",
                shadowColor: "#000000",
                shadowOpacity: 1,
                shadowRadius: 2,
                shadowOffset: {
                        height: 1,
                        width: 1
                },
                elevation: 3,
        }
});

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


export default AnalyticsScreen;