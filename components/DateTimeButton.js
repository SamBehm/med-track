import { Component } from "react";
import DateTimePicker from '@react-native-community/datetimepicker'
import { TouchableOpacity, Text, View, Platform } from "react-native";
import moment from 'moment';

class DateTimeButton extends Component {

        constructor(props) {
                super(props);
        }

        render() {

                let dateString = moment(this.props.date).format("LT");

                return (
                        <View>
                                <TouchableOpacity
                                        style={{
                                                height: 50,
                                                justifyContent: "center",
                                                alignItems: "center"
                                        }}
                                        onPress={() => { this.props.onPressHandler(true) }}
                                >
                                        <Text style={{ textAlign: "center", fontSize: 20 }}>
                                                {dateString}
                                        </Text>
                                </TouchableOpacity>
                                {this.props.show && (
                                        <DateTimePicker
                                                value={this.props.date}
                                                mode={this.props.mode}
                                                is24Hour={false}
                                                onChange={this.props.onChangeHandler}
                                        />
                                )}
                        </View>

                );

        }

}

export default DateTimeButton;