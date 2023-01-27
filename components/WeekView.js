import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
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
                const dayContainers = this._createDayContainers();
                return (
                        <View style={styles.container}>
                                <View style={styles.headerView}>
                                        <View style={[styles.headerBubble, styles.shadow]}>
                                                <Text style={{ fontSize: 30, fontWeight: "bold" }}>{monthNames[this.props.date.getMonth()]}</Text>
                                        </View>
                                </View>
                                {
                                        dayContainers
                                }
                        </View>
                );
        }

        _createDayContainers() {
                let dayContainers = [];
                for (let i = 0; i < 7; i++) {
                        let style = [styles.dayContainer, styles.shadow];

                        let date = new Date(this.props.date.getTime());
                        date.setDate(date.getDate() + i);
                        date.setHours(0, 0, 0, 0);

                        let today = new Date();
                        today.setHours(0, 0, 0, 0);

                        if (date.getTime() == today.getTime()) {
                                style.push({
                                        borderWidth: 2,
                                        borderColor: '#4bee9a'
                                });
                        }

                        dayContainers.push(
                                <View style={style} key={i}>
                                        <View style={styles.dayHeaderContainer}>

                                        </View>
                                        <View></View>
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
        headerView: {
                flex: 8 / 5,
                justifyContent: 'center',
                alignItems: 'center',
                width: "100%",
                marginTop: "12%",
        },
        headerBubble: {
                backgroundColor: "white",
                paddingVertical: "5%",
                paddingHorizontal: "10%",
                borderRadius: 25,
        },
        dayContainer: {
                flex: 1,
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
                backgroundColor: "white",
                width: "90%",
                marginVertical: 10,
                borderRadius: 25,
        },
        dayHeaderContainer: {
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                borderRightWidth: 1,
                borderRightColor: 'grey',
                height: "50%"
        },
        shadow: {
                shadowColor: "#000000",
                shadowOpacity: 1,
                shadowRadius: 2,
                shadowOffset: {
                        height: 1,
                        width: 1
                },
                elevation: 3
        }
});

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default WeekView;