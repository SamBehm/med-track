import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import PillSVG from './PillSVG';
import { medStatusOfDate, setMedsTakenForDate, unsetMedsTakenForDate } from '../libs/localStorageHandler/localStorage';

class PillButton extends Component {
        constructor(props) {
                super(props);
                this.state = {
                        medsTaken: null,
                        awaitingIO: false
                };

                this._updateMedStatus = this._updateMedStatus.bind(this);
        }

        componentDidMount() {
                medStatusOfDate(new Date()).then((response) => {
                        this.setState({ medsTaken: response != null ? true : false });
                }).catch((error) => {
                        console.log(error);
                });
        }

        render() {
                const { medsTaken, awaitingIO } = this.state;
                if (medsTaken == null) {
                        return (
                                <View style={this.props.style}>
                                        <View style={[styles.circleButton]}>
                                                <Text>Loading</Text>
                                        </View>
                                </View>
                        );

                }

                console.log(medsTaken);

                const style = {
                        backgroundColor: medsTaken ? '#4bee9a' : 'none',
                        ...styles.circleButton
                };

                return (
                        <View style={this.props.style}>
                                <TouchableOpacity disabled={awaitingIO} onPress={this._updateMedStatus}>
                                        <View style={style}>
                                                <PillSVG width={75} height={75} />
                                        </View>
                                </TouchableOpacity>
                                <Text style={styles.headlineText}>
                                        {this.state.medsTaken ? "Nice! See you tomorrow :)" : "Ready to take your meds?"}
                                </Text>
                        </View>
                );
        }

        async _updateMedStatus() {
                this.setState(() => ({
                        awaitingIO: true
                }));

                if (this.state.medsTaken) {
                        await unsetMedsTakenForDate(new Date());
                } else {
                        await setMedsTakenForDate(new Date());
                }

                this.setState((state) => ({
                        medsTaken: !state.medsTaken,
                        awaitingIO: false,
                }));
        }

}

const styles = StyleSheet.create({
        circleButton: {
                flex: 0,
                alignItems: 'center',
                justifyContent: 'center',
                width: 150,
                height: 150,
                borderWidth: 2,
                borderRadius: 75,
                borderColor: '#4bee9a'
        },
        headlineText: {
                textAlign: 'center',
                width: 200,
                fontSize: 30,
                opacity: 0.7,
                margin: 20
        }
});

export default PillButton;