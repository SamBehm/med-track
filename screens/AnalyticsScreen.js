import { Component } from "react";
import { View, Text, StyleSheet } from "react-native";


class AnalyticsScreen extends Component {
        constructor(props) {
                super(props);
        }

        render() {


                return (
                        <View style={[styles.container, { marginVertical: "10%", marginHorizontal: "5%" }]}>
                                <View style={[styles.graphContainer, styles.statContainer]}>

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
                justifyContent: "center",
                alignContent: "center",
                marginBottom: "4%"
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