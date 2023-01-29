import { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import LineChart from "../components/graphing/LineChart";


class AnalyticsScreen extends Component {
        constructor(props) {
                super(props);
        }

        render() {


                return (
                        <View style={[styles.container, { marginVertical: "10%", marginHorizontal: "5%" }]}>
                                <View style={[styles.graphContainer, styles.statContainer]}>
                                        <LineChart
                                                containerStyle={{ flex: 1, width: "100%", maxHeight: "50%" }}
                                                axisColor={"grey"}
                                                pointColor={"#4bee9a"}
                                                pointRadius={5}
                                                data={[5, 1, 3, 3, 0, 4, 2]}
                                                maxYValue={5}
                                        />
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
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
                justifyContent: "center",
                alignContent: "center",
        },
        graphContainer: {
                flex: 4,
                justifyContent: "flex-start",
                alignContent: "center",
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