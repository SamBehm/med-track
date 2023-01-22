import { StyleSheet, View, Text } from 'react-native';
import PillButton from '../components/PillButton';
import React, { Component } from 'react';

export default class MainScreen extends Component {

        constructor(props) {
                super(props);

                this.state = { medsTaken: null };
                this.updateCaption = this.updateCaption.bind(this);
        }

        updateCaption(medStatus) {
                this.setState({
                        medsTaken: medStatus
                });
        }

        render() {
                return (
                        <View style={styles.container}>
                                <PillButton updateCaption={this.updateCaption} svgDimensions={75} />
                                <Text style={styles.headlineText}>
                                        {this.state.medsTaken ? "Nice! See you tomorrow :)" : "Ready to take your meds?"}
                                </Text>
                        </View>
                );
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
