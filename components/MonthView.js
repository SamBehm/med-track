import { StyleSheet, View, Text, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import React, { Component } from 'react';
import { medStatusOfDate } from '../libs/localStorageHandler/localStorage';

class MonthView extends Component {

        constructor(props) {
                View
                super(props);

                this.state = {
                        data: null,
                        refreshing: false
                }

                this._loadMonth = this._loadMonth.bind(this);
                this._onRefresh = this._onRefresh.bind(this);
        }

        componentDidMount() {
                let promises = this._loadMonth();
                Promise.all(promises).then((values) => {
                        this.setState(() => ({
                                data: values
                        }));
                });
        }

        render() {
                if (this.state.data == null) {
                        return (<Text>Loading...</Text>);
                }

                return (
                        <ScrollView
                                contentContainerStyle={styles.container}
                                refreshControl={
                                        <RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh} />
                                }
                        >
                                <View style={styles.header}>
                                        <TouchableOpacity style={[styles.monthButton, styles.shadow]}>
                                                <Text style={{ fontSize: 30, fontWeight: "bold" }}>{monthNames[this.props.month]}</Text>
                                        </TouchableOpacity>
                                </View>

                                <View style={styles.monthContainer}>
                                        <View style={[styles.row, {
                                                maxHeight: 15,
                                                minHeight: 15,

                                        }]}>
                                                <Text style={styles.weekHeaderText}>S</Text>
                                                <Text style={styles.weekHeaderText}>M</Text>
                                                <Text style={styles.weekHeaderText}>T</Text>
                                                <Text style={styles.weekHeaderText}>W</Text>
                                                <Text style={styles.weekHeaderText}>T</Text>
                                                <Text style={styles.weekHeaderText}>F</Text>
                                                <Text style={styles.weekHeaderText}>S</Text>
                                        </View>
                                        {this._createDays()}
                                </View>
                        </ScrollView>
                );
        }

        _onRefresh() {
                this.setState({ refreshing: true });
                let promises = this._loadMonth();
                Promise.all(promises).then((values) => {
                        this.setState(() => ({
                                data: values,
                                refreshing: false
                        }));
                });

        }

        _createDays() {
                let data = this.state.data;
                let numDays = data.length;

                let date = new Date();
                date.setFullYear(this.props.year, this.props.month, 1);
                let offset = date.getDay();

                let rows = [];
                let maxNumColumns = 7;
                let numRows = Math.ceil((numDays + offset) / maxNumColumns);

                let currentDayNum = 0;

                for (let row = 0; row < numRows; row++) {

                        let days = [];
                        let currentStreak = [];
                        let currentStreakID = 0;

                        if (offset > 0) {
                                let lastMonth = new Date(this.props.year, this.props.month, 0);

                                while (offset != 0) {
                                        let key = lastMonth.getDate() - (offset - 1);
                                        days.push(<DayButton key={`lm${key}`} dayNum={key} value={null} style={{ opacity: 0.2 }} />)
                                        offset--;
                                }
                        }

                        for (let col = 0; (col < maxNumColumns && days.length < maxNumColumns); col++) {

                                let key = currentDayNum;
                                currentDayNum++;

                                if (key >= data.length) {
                                        break;
                                }

                                let dayButton = (<DayButton key={key} dayNum={key + 1} value={data[key]} />);

                                if (data[key] != null) {
                                        currentStreak.push(dayButton);
                                        continue;
                                }

                                if (currentStreak.length > 0) {
                                        days.push(
                                                <View
                                                        style={{
                                                                flex: currentStreak.length,
                                                                flexDirection: "row",
                                                                justifyContent: "center",
                                                                alignItems: "center",
                                                        }}
                                                        key={'s' + currentStreakID++}
                                                >
                                                        <View style={{
                                                                flexDirection: "row",
                                                                backgroundColor: "#4bee9a",
                                                                borderRadius: 25,
                                                                minHeight: "50%",
                                                                justifyContent: "space-between",
                                                                alignItems: "center",
                                                        }}>
                                                                {currentStreak}
                                                        </View>
                                                </View>
                                        );
                                        days.push(dayButton);
                                        currentStreak = [];
                                        continue;
                                }

                                days.push(dayButton);

                        }

                        if (row == numRows - 1) {
                                let i = 0;
                                while (days.length < maxNumColumns) {
                                        days.push(<DayButton key={`nm${i}`} dayNum={i + 1} value={null} style={{ opacity: 0.2 }} />);
                                        i++;
                                }
                        }

                        rows.push(
                                <View style={styles.row} key={row.toString()} >
                                        {days}
                                </View >
                        );

                }

                return rows;
        }



        _loadMonth() {
                let baseDate = new Date(this.props.year, this.props.month, 1);
                let promises = [];
                while (baseDate.getMonth() == this.props.month) {
                        promises.push(medStatusOfDate(new Date(baseDate)));
                        baseDate.setDate(baseDate.getDate() + 1);
                }

                return promises;
        }
}

function DayButton(props) {
        return (
                <TouchableOpacity
                        style={[{
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center"
                        }, props.style]}
                >
                        <View style={{
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                                minWidth: 25,
                                minHeight: 25,
                                maxWidth: 25,
                                maxHeight: 25,
                                borderRadius: 25
                        }}>
                                <Text style={{
                                        textAlign: "center",
                                        fontWeight: "bold",
                                        fontSize: 16,
                                        color: props.value == null ? "black" : "white"
                                }}>
                                        {props.dayNum}
                                </Text>
                        </View>
                </TouchableOpacity>
        );
}


const styles = StyleSheet.create({
        container: {
                flex: 5,
                justifyContent: "flex-start",
                alignItems: "center",
        },
        header: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: "100%",
                marginTop: "8%",
        },
        monthButton: {
                backgroundColor: "white",
                paddingVertical: "5%",
                paddingHorizontal: "10%",
                borderRadius: 25,
        },
        monthContainer: {
                flex: 5,
                justifyContent: "flex-start",
                alignItems: "center",
                backgroundColor: "white",
                padding: "5%",
                marginHorizontal: "2%",
                marginVertical: "5%",
                borderRadius: 25,
                maxHeight: "70%"
        },
        row: {
                flexGrow: 1,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                maxHeight: 70,
                minHeight: 70,
                width: "90%",
        },
        weekHeaderText: {
                flex: 1,
                color: "grey",
                textAlign: "center",
                fontWeight: "bold"
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

export default MonthView;