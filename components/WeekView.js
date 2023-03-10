import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import React, { Component } from 'react';
import { medStatusOfDate, setMedsTakenForDate, unsetMedsTakenForDate } from '../libs/localStorageHandler/localStorage';
import PillButton from './PillButton';
import DateTimeButton from './DateTimeButton';

class WeekView extends Component {

        constructor(props) {
                super(props);

                this.state = {
                        data: null,
                        refreshing: false,
                        awaitingIO: true,
                        timePickerStatus: [false, false, false, false, false, false, false]
                }

                this._loadWeek = this._loadWeek.bind(this);
                this._createDayContainers = this._createDayContainers.bind(this);
                this._selectTime = this._selectTime.bind(this);
                this._dateTimeChangeHandler = this._dateTimeChangeHandler.bind(this);
                this._updateMedStatusOfDate = this._updateMedStatusOfDate.bind(this);
                this._onRefresh = this._onRefresh.bind(this);
        }

        componentDidMount() {
                let promises = this._loadWeek();
                Promise.all(promises).then((values) => {
                        this.setState({
                                data: values,
                                awaitingIO: false
                        });
                })
        }

        render() {

                let left = `${monthNames[this.props.date.getMonth()].substring(0, 3)} ${this.props.date.getDate()}`;
                let finalDate = new Date(this.props.date.getTime());
                finalDate.setDate(finalDate.getDate() + 7);
                let right = `${monthNames[finalDate.getMonth()].substring(0, 3)} ${finalDate.getDate()}`;
                const headerSubText = left + ' - ' + right;

                return (
                        <ScrollView
                                contentContainerStyle={styles.container}
                                refreshControl={
                                        <RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh} />
                                }
                        >
                                <View style={styles.container}>
                                        <View style={styles.headerView}>
                                                <View style={[styles.headerBubble, styles.shadow]}>
                                                        <Text
                                                                style={{
                                                                        fontSize: 30,
                                                                        fontWeight: "bold"
                                                                }}
                                                        >
                                                                {monthNames[this.props.date.getMonth()]}
                                                        </Text>
                                                        <Text
                                                                style={{
                                                                        fontSize: 15,
                                                                        fontWeight: "bold",
                                                                        opacity: 0.5
                                                                }}
                                                        >
                                                                {headerSubText}
                                                        </Text>
                                                </View>
                                        </View>
                                        {
                                                this._createDayContainers()
                                        }
                                </View>
                        </ScrollView>
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

                        if (this.state.data && this.state.data[i]) {
                                let splitTime = this.state.data[i].split(":");
                                date.setHours(parseInt(splitTime[0]));
                                date.setMinutes(parseInt(splitTime[1]));
                        }

                        dayContainers.push(
                                <View style={style} key={i}>
                                        <View style={styles.dayHeaderContainer}>
                                                <Text style={{ fontSize: 25, fontWeight: "bold", textAlign: "center" }}>
                                                        {date.getDate()}
                                                </Text>
                                                <Text style={{ fontSize: 15, fontWeight: "bold", textAlign: "center", opacity: 0.5 }}>
                                                        {monthNames[date.getMonth()].substring(0, 3)}
                                                </Text>
                                        </View>
                                        <View style={styles.dateTimePickerContainer}>
                                                <DateTimeButton
                                                        date={date}
                                                        mode={'time'}
                                                        show={this.state.timePickerStatus[i]}
                                                        onChangeHandler={(event, date) => { this._dateTimeChangeHandler(event, date, i) }}
                                                        onPressHandler={() => {
                                                                let newTimePickerStatus = this.state.timePickerStatus;
                                                                newTimePickerStatus[i] = !newTimePickerStatus[i];
                                                                this.setState({ timePickerStatus: newTimePickerStatus })
                                                        }}
                                                        displayTime={this.state.data == null ? false : this.state.data[i]}
                                                />
                                        </View>
                                        <PillButton
                                                svgDimensions={20}
                                                medsTaken={this.state.data == null ? null : this.state.data[i]}
                                                awaitingIO={this.state.awaitingIO}
                                                onPressHandler={() => { this._selectTime(i) }}
                                                style={{ marginHorizontal: 5 }}
                                        />
                                </View>
                        )
                }

                return dayContainers;
        }

        _loadWeek() {
                let promises = [];

                let baseDate = new Date(this.props.date.getTime());
                for (let i = 0; i < 7; i++) {
                        promises.push(medStatusOfDate(new Date(baseDate)));
                        baseDate.setDate(baseDate.getDate() + 1);
                }

                return promises;
        }

        _onRefresh() {
                this.setState({ refreshing: true });
                let promises = this._loadWeek();
                Promise.all(promises).then((values) => {
                        this.setState(() => ({
                                data: values,
                                refreshing: false
                        }));
                });
        }

        _dateTimeChangeHandler(event, date, index) {
                let newTimePickerStatus = this.state.timePickerStatus;
                newTimePickerStatus[index] = false;
                this.setState({
                        newTimePickerStatus
                });

                if (event.type != 'set') {
                        return;
                }

                this._updateMedStatusOfDate(date);
        }

        _selectTime(index) {
                let data = this.state.data[index];

                if (data) {
                        let targetDate = new Date(this.props.date.getTime());
                        targetDate.setDate(targetDate.getDate() + index);
                        this._updateMedStatusOfDate(targetDate);
                        return;
                }

                let timePickerStatus = this.state.timePickerStatus;
                timePickerStatus[index] = true;
                this.setState({ timePickerStatus: timePickerStatus });
        }

        async _updateMedStatusOfDate(date) {

                this.setState({ awaitingIO: true });

                let index = date.getDay();
                let newTime = null;

                if (this.state.data[index] != null) {
                        await unsetMedsTakenForDate(date);
                } else {
                        newTime = await setMedsTakenForDate(date);
                }

                let newData = this.state.data;
                newData[index] = newTime;

                this.setState({
                        data: newData,
                        awaitingIO: false,
                });
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
                justifyContent: "center",
                alignItems: "center",
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
                marginVertical: 5,
                borderRadius: 25,
        },
        dayHeaderContainer: {
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                borderRightWidth: 1,
                borderRightColor: 'grey',
                height: "50%",
                paddingHorizontal: 7
        },
        dateTimePickerContainer: {
                flex: 5,
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
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