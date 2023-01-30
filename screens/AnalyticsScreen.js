import { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import AnimatedLoadCircle from "../components/AnimatedLoadCircle";
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
                return (
                        <View style={[styles.container, { marginVertical: "10%", marginHorizontal: "5%" }]}>
                                <View style={[styles.graphContainer, styles.statContainer]}>
                                        {this.state.monthData
                                                ? <LineChart
                                                        containerStyle={{ flex: 1, width: "100%", maxHeight: "50%" }}
                                                        lineColor={"grey"}
                                                        pointColor={"#4bee9a"}
                                                        pointRadius={5}
                                                        data={averageTimeTakenPerDay(this.state.monthData)}
                                                        maxYValue={24}
                                                />
                                                : (
                                                        <View style={{ flex: 1, justifyContent: "center" }}>
                                                                <AnimatedLoadCircle diameter={75} />
                                                        </View>
                                                )
                                        }
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

function averageTimeTakenPerDay(data) {
        let averages = [];

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
                        averages.push(0);
                        continue;
                }

                let average = (total / count);

                averages.push(average / 60);
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

export default AnalyticsScreen;