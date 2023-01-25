import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { PillSVG } from './SVGs';

class PillButton extends Component {
        constructor(props) {
                super(props);
        }

        render() {

                const style = {
                        backgroundColor: this.props.medsTaken ? '#4bee9a' : 'transparent',
                        width: this.props.svgDimensions * 2,
                        height: this.props.svgDimensions * 2,
                        borderRadius: this.props.svgDimensions,
                        ...styles.circleButton
                };

                if (this.props.medsTaken == null && this.props.awaitingIO) {
                        return (
                                <View style={style}>
                                        <Text style={{ fontSize: 20, textAlign: "center" }}>Loading...</Text>
                                </View>
                        );

                }

                return (
                        <TouchableOpacity disabled={this.props.awaitingIO} onPress={this.props.onPressHandler} style={this.props.style}>
                                <View style={style}>
                                        <PillSVG width={this.props.svgDimensions} height={this.props.svgDimensions} color={"#4bee9a"} />
                                </View>
                        </TouchableOpacity>
                );
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