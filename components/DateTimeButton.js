import { Component } from "react";
import DateTimePicker from '@react-native-community/datetimepicker'
import { TouchableOpacity, Text, View } from "react-native";

class DateTimeButton extends Component {

        constructor(props) {
                super(props);

                this.state = {
                        date: this.props.date
                }
        }

        render() {
                return (
                        <View>
                                <TouchableOpacity
                                        style={{
                                                width: 150,
                                                height: 50,
                                                justifyContent: "center",
                                                alignItems: "center"
                                        }}
                                >
                                        <Text style={{ textAlign: "center", fontSize: 20 }}>
                                                {this.state.date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                        </Text>
                                </TouchableOpacity>
                                {this.props.show && (
                                        <DateTimePicker
                                                value={this.state.date}
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