import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import React, { Component } from 'react';
import { medStatusOfDate } from '../libs/localStorageHandler/localStorage';

class WeekView extends Component {

        constructor(props) {
                super(props);

                this.state = {
                        data: null,
                        refreshing: false,
                        awaitingIO: false
                }

                this._loadWeek = this._loadWeek.bind(this);
                this._createDayContainers = this._createDayContainers.bind(this);
        }

        componentDidMount() {
                let promises = this._loadWeek();
                Promise.all(promises).then((values) => {
                        this.setState({
                                data: values
                        });
                })
        }

        render() {
                return (
                        <View style={styles.container}>
                                <View style={styles.header}>
                                        <Text style={{ fontSize: 30 }}>Date - Date</Text>
                                </View>
                                {
                                        this._createDayContainers()
                                }
                        </View>
                );
        }

        _createDayContainers() {
                let dayContainers = [];
                for (let i = 0; i < 7; i++) {
                        dayContainers.push(
                                <View style={styles.dayContainer} key={i}>
                                        <View style={styles.dayHeaderContainer}>

                                        </View>
                                </View>
                        )
                }

                return dayContainers;
        }

        _loadWeek() {
                let promises = [];

                let baseDate = this.props.date;
                for (let i = 0; i < 7; i++) {
                        promises.push(medStatusOfDate(new Date(baseDate)));
                        baseDate.setDate(baseDate.getDate() + 1);
                }

                return promises;
        }

}

const styles = StyleSheet.create({
        container: {
                flex: 1,
                justifyContent: "flex-start",
                alignItems: "center"
        },
        header: {
                flex: 1,
                minHeight: "15%",
                backgroundColor: "white",
                width: "100%",
                justifyContent: "center",
                alignItems: "center"
        },
        dayContainer: {
                flex: 1,
                minHeight: "14%",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
                backgroundColor: "white",
                width: "90%",
                marginTop: 20
        },
        dayHeaderContainer: {
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                borderRightWidth: 1,
                borderRightColor: 'grey',
                height: "70%"
        }
});

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default WeekView;