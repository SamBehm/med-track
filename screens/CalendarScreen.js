import { StyleSheet, View, Text } from 'react-native';
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
        }

        render() {
                if (this.state.view == "week") {
                        return (
                                <View style={styles.container}>
                                        <WeekView />
                                </View>
                        )
                }

                let currentDate = new Date();

                return (
                        <View style={styles.container}>
                                <View style={[styles.header, styles.container]}>
                                        <Text style={{ fontSize: 30, fontWeight: "bold", marginTop: "6%" }}>{monthNames[currentDate.getMonth()]}</Text>
                                </View>
                                <MonthView year={currentDate.getFullYear()} month={currentDate.getMonth()} />
                        </View>
                )

        }

}

const styles = StyleSheet.create({
        container: {
                flexGrow: 1,
                justifyContent: 'center',
                alignItems: 'center'
        },
        header: {
                maxHeight: "10%",
                width: "100%",
                borderBottomWidth: 1,
                borderBottomColor: 'grey',
        }
});

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default CalendarScreen;