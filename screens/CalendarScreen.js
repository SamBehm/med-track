import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';
import MonthSwiper from '../components/MonthSwiper';
import WeekSwiper from '../components/WeekSwiper';

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

                return (
                        <View style={styles.container}>
                                <View style={styles.swiper}>
                                        {
                                                this.state.view == 'month'
                                                        ? <MonthSwiper />
                                                        : <WeekSwiper />
                                        }
                                </View>
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
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
        },
        swiper: {
                flex: 8,
                justifyContent: "center",
                alignItems: "center",
                width: "100%"
        },
        controller: {
                flex: 0.7,
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



export default CalendarScreen;