import { StyleSheet, View, Text } from 'react-native';
import PillButton from '../components/PillButton';
import React, { Component } from 'react';
import { medStatusOfDate, setMedsTakenForDate, unsetMedsTakenForDate } from '../libs/localStorageHandler/localStorage';

export default class MainScreen extends Component {

        constructor(props) {
                super(props);

                this.state = { medsTaken: null, awaitingIO: true };

                this._updateMedStatus = this._updateMedStatus.bind(this);
        }

        componentDidMount() {
                medStatusOfDate(new Date()).then((response) => {
                        this.setState({ medsTaken: response, awaitingIO: false });
                }).catch((error) => {
                        console.log(error);
                });
        }

        render() {
                return (
                        <View style={styles.container}>
                                <PillButton
                                        svgDimensions={75}
                                        medsTaken={this.state.medsTaken}
                                        awaitingIO={this.state.awaitingIO}
                                        onPressHandler={this._updateMedStatus}
                                />
                                <Text style={styles.headlineText}>
                                        {(this.state.medsTaken == null && this.state.awaitingIO)
                                                ? "Loading..."
                                                : (this.state.medsTaken
                                                        ? "Nice! See you tomorrow :)"
                                                        : "Ready to take your meds?")
                                        }
                                </Text>
                        </View>
                );
        }

        async _updateMedStatus() {
                this.setState(() => ({
                        awaitingIO: true
                }));

                let date = new Date();
                let newTime = null;

                if (this.state.medsTaken) {
                        await unsetMedsTakenForDate(date);
                } else {
                        newTime = await setMedsTakenForDate(date);
                }

                this.setState({
                        medsTaken: newTime,
                        awaitingIO: false,
                });
        }
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
                backgroundColor: '#fff',
                alignItems: "center",
                justifyContent: "center",
        },
        headlineText: {
                textAlign: 'center',
                width: 200,
                fontSize: 30,
                opacity: 0.7,
                padding: 20
        }
});
