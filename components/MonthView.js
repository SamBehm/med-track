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
                );
        }

        _createDays() {

                let data = this.state.data;
                let numDays = data.length;

                let rows = [];
                let maxNumColumns = 7;
                let numRows = Math.ceil(numDays / maxNumColumns);

                let date = new Date();
                date.setFullYear(this.props.year, this.props.month, 1);
                let offset = date.getDay();

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

                        for (let col = 0; days.length < maxNumColumns; col++) {
                                let key = (row * maxNumColumns) + col;

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

                Promise.all(promises).then((values) => {
                        this.setState(() => ({
                                data: values
                        }));
                });
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
                flexGrow: 1,
                width: "100%",
                maxHeight: "70%",
                justifyContent: "center",
                alignItems: "center",
        },
        row: {
                flexGrow: 1,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                maxHeight: 75,
                minHeight: 75,
                width: "90%",
        },
        weekHeaderText: {
                flex: 1,
                color: "grey",
                textAlign: "center",
                fontWeight: "bold"
        }
});

export default MonthView;