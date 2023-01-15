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

                let numDays = this.state.data.length;

                let rows = [];
                let maxNumColumns = 7;
                let numRows = Math.ceil(numDays / maxNumColumns);
                let lastRowNumColumns = numDays - ((numRows - 1) * maxNumColumns);

                for (let row = 0; row < numRows; row++) {
                        let days = [];
                        let numColumns = row == numRows - 1 ?
                                lastRowNumColumns
                                : maxNumColumns;
                        for (let column = 0; column < numColumns; column++) {
                                days.push(
                                        <TouchableOpacity style={styles.dayContainer} key={(row * maxNumColumns) + column}>
                                                <View style={styles.textContainer}>
                                                        <Text style={{
                                                                color: "white",
                                                                fontSize: 15,
                                                                fontWeight: "bold"
                                                        }}>{(row * maxNumColumns) + column + 1}</Text>
                                                </View>
                                        </TouchableOpacity>
                                );
                        }

                        if (row == numRows - 1 && numColumns != maxNumColumns) {
                                days.push(<View style={{ flexGrow: maxNumColumns - numColumns }}></View>)
                        }

                        rows.push(<View style={styles.row} key={row}>{days}</View>);
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
        },
        row: {
                flexGrow: 1,
                flexDirection: 'row',
                paddingHorizontal: "5%"
        },
        dayContainer: {
                flexGrow: 1,
                justifyContent: "center",
                alignItems: "center",
                maxWidth: "14.2%"
        },
        textContainer: {
                width: 25,
                height: 25,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 25,
                backgroundColor: '#4bee9a'
        }
});

export default MonthView;