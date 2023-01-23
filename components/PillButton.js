import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { PillSVG } from './SVGs';
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
                medStatusOfDate(this.props.date).then((response) => {

                        let medsStatus = response != null ? true : false;
                        this.setState({ medsTaken: medsStatus });
                        if (this.props.updateCaption) {
                                this.props.updateCaption(medsStatus);
                                console.log("updating");
                        }

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

                const style = {
                        backgroundColor: medsTaken ? '#4bee9a' : 'transparent',
                        width: this.props.svgDimensions * 2,
                        height: this.props.svgDimensions * 2,
                        borderRadius: this.props.svgDimensions,
                        ...styles.circleButton
                };

                return (
                        <TouchableOpacity disabled={awaitingIO} onPress={this._updateMedStatus} style={this.props.style}>
                                <View style={style}>
                                        <PillSVG width={this.props.svgDimensions} height={this.props.svgDimensions} color={"#4bee9a"} />
                                </View>
                        </TouchableOpacity>
                );
        }

        async _updateMedStatus() {
                this.setState(() => ({
                        awaitingIO: true
                }));

                if (this.state.medsTaken) {
                        await unsetMedsTakenForDate(this.props.date);
                } else {
                        await setMedsTakenForDate(this.props.date);
                }

                if (this.props.updateCaption) {
                        this.props.updateCaption(!this.state.medsTaken);
                        console.log("updating");
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
                borderWidth: 2,
                borderColor: '#4bee9a'
        }
});

export default PillButton;