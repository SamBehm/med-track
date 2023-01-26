import { View, Text } from 'react-native';
import React, { Component } from 'react';

class WeekView extends Component {

        constructor(props) {
                super(props);

                this.state = {
                        data: null,
                        refreshing: false,
                        awaitingIO: false
                }
        }

        render() {

                if (this.state.data == null) {

                }

                return (
                        <View>
                                <Text>{this.props.date.toString()}</Text>
                        </View>
                );
        }

}

export default WeekView;