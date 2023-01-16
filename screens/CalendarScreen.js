import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import React, { Component, Dimensions } from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import WeekView from '../components/WeekView';
import MonthView from '../components/MonthView';

class CalendarScreen extends Component {

        constructor(props) {
                super(props);
                this.state = {
                        view: props.view ? props.view : 'month'
                }

                this._setViewMonth = this._setViewMonth.bind(this);
                this._setViewWeek = this._setViewWeek.bind(this);
        }

        render() {
                let currentDate = new Date();

                return (
                        <View style={styles.container}>
                                <View style={styles.header}>
                                        <TouchableOpacity style={[styles.monthButton, styles.shadow]}>
                                                <Text style={{ fontSize: 30, fontWeight: "bold" }}>{monthNames[currentDate.getMonth()]}</Text>
                                        </TouchableOpacity>
                                </View>
                                {
                                        this.state.view == 'month'
                                                ? (<MonthView year={currentDate.getFullYear()} month={currentDate.getMonth()} />)
                                                : (<WeekView />)
                                }
                                <View style={[styles.controller, styles.shadow]}>
                                        <TouchableOpacity style={styles.viewButton} onPress={this._setViewMonth}>
                                                <Text>Monthly</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.viewButton} onPress={this._setViewWeek}>
                                                <Text>Weekly</Text>
                                        </TouchableOpacity>
                                </View>
                        </View>
                )

        }

        _setViewMonth() {
                if (this.state.view == 'month') {
                        return;
                }

                this.setState(() => ({
                        view: 'month'
                }));
        }

        _setViewWeek() {
                if (this.state.view == 'week') {
                        return;
                }

                this.setState(() => ({
                        view: 'week'
                }));
        }

}

const styles = StyleSheet.create({
        container: {
                flex: 4,
                justifyContent: 'center',
                alignItems: 'center'
        },
        header: {
                flex: 2,
                justifyContent: 'center',
                alignItems: 'center',
                width: "100%",
                marginTop: "5%",
        },
        controller: {
                flex: 1,
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
        },
        viewButton: {
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                backgroundColor: "white",
        },
        monthButton: {
                backgroundColor: "white",
                paddingVertical: "5%",
                paddingHorizontal: "10%",
                borderRadius: 25,
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

export default CalendarScreen;