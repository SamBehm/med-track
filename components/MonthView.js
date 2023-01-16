import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';
import { medStatusOfDate } from '../libs/localStorageHandler/localStorage';

class MonthView extends Component {

        constructor(props) {
                View
                super(props);

                this.state = {
                        data: null,
                }

                this._loadMonth = this._loadMonth.bind(this);
        }

        componentDidMount() {
                this._loadMonth();
        }

        render() {
                if (this.state.data == null) {
                        return (<Text>Loading...</Text>);
                }

                return (
                        <View style={styles.container}>
                                {this._createDays()}
                        </View>
                );
        }

        _createDays() {

                let data = this.state.data;
                let numDays = data.length;

                let rows = [];
                let maxNumColumns = 7;
                let numRows = Math.ceil(numDays / maxNumColumns);
                let lastRowNumColumns = numDays - ((numRows - 1) * maxNumColumns);

                for (let row = 0; row < numRows; row++) {

                        let days = [];
                        let currentStreak = [];
                        let currentStreakID = 0;

                        for (let col = 0; col < maxNumColumns; col++) {
                                let key = (row * maxNumColumns) + col;

                                let dayButton = (
                                        <TouchableOpacity
                                                style={{
                                                        flex: 1,
                                                        justifyContent: "center",
                                                        alignItems: "center"
                                                }}
                                                key={key}
                                        >
                                                <View style={{
                                                        flex: 1,
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        minWidth: 25,
                                                        minHeight: 25,
                                                        maxWidth: 25,
                                                        maxHeight: 25,
                                                        borderRadius: 25,
                                                        backgroundColor: data[key] == null ? 'transparent' : 'green'
                                                }}>
                                                        <Text style={{
                                                                textAlign: "center",
                                                                fontWeight: "bold",
                                                                fontSize: 16,
                                                                color: data[key] == null ? "black" : "white"
                                                        }}>
                                                                {key + 1}
                                                        </Text>
                                                </View>
                                        </TouchableOpacity>
                                )

                                if (data[key] != null) {
                                        currentStreak.push(dayButton);
                                        continue;
                                }

                                if (currentStreak.length > 1) {
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

                                if (currentStreak.length == 1) {
                                        days.push(currentStreak[0]);
                                        days.push(dayButton);
                                        currentStreak = [];
                                        continue;
                                }

                                days.push(dayButton);

                        }

                        rows.push(
                                <View style={[styles.row, { backgroundColor: "transparent" }]} key={row.toString()} >
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

                Promise.all(promises).then((values) => {
                        this.setState(() => ({
                                data: values
                        }));
                });
        }
}


const styles = StyleSheet.create({
        container: {
                flexGrow: 1,
                width: "100%",
                maxHeight: "70%",
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 1,
        },
        row: {
                flexGrow: 1,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                maxHeight: 100,
                minHeight: 100,
                width: "90%",
                borderWidth: 1
        }
});

export default MonthView;