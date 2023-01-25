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
                                {this.props.displayTime
                                        ? (<TouchableOpacity
                                                style={{
                                                        height: 50,
                                                        justifyContent: "center",
                                                        alignItems: "center"
                                                }}
                                                onPress={this.props.onPressHandler}
                                        >
                                                <Text style={{ textAlign: "center", fontSize: 20 }}>
                                                        {dateString}
                                                </Text>
                                        </TouchableOpacity>)
                                        : (<Text style={{ fontSize: 15 }}>No Record Found</Text>)
                                }
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