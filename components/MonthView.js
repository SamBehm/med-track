import { StyleSheet, View, Text } from 'react-native';
import React, { Component } from 'react';
import { medStatusOfDate } from '../libs/localStorageHandler/localStorage';

class MonthView extends Component {

        constructor(props) {
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
                                        <View style={styles.dayContainer} key={(row * maxNumColumns) + column}>
                                                <Text>{(row * maxNumColumns) + column}</Text>
                                        </View>
                                );
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
                width: "100%"
        },
        row: {
                flexGrow: 1,
                flexDirection: 'row',
        },
        dayContainer: {
                flexBasis: "100%",
                flexGrow: 1,
                flexShrink: 1,
                borderWidth: 1,
                borderColor: "grey"
        }
});

export default MonthView;