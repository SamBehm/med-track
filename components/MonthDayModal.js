import React, { Component } from "react";
import GestureRecognizer from 'react-native-swipe-gestures';
import { View, Text, Modal } from "react-native";
import PillButton from './PillButton';
import DateTimeButton from "./DateTimeButton";



class MonthDayModal extends Component {

        constructor(props) {
                super(props);
                this.state = {
                        timePickerVisible: false
                }

                this._selectTime = this._selectTime.bind(this);
                this._updateData = this._updateData.bind(this);
        }

        render() {
                let { year, month, day } = this.props.targetDate;
                let targetDateObj = new Date(year, month, day);

                if (this.props.data) {
                        let splitTime = this.props.data.split(":");
                        targetDateObj.setHours(parseInt(splitTime[0]));
                        targetDateObj.setMinutes(parseInt(splitTime[1]));
                }

                let modalInfo;
                if (targetDateObj.getTime() > (new Date()).getTime()) {
                        modalInfo = (
                                <Text>Want to set a reminder?</Text>
                        );
                } else {
                        modalInfo = ([
                                <DateTimeButton
                                        key={1}
                                        date={targetDateObj}
                                        mode={'time'}
                                        show={this.state.timePickerVisible}
                                        onChangeHandler={this._updateData}
                                        onPressHandler={this._selectTime}
                                />,
                                <PillButton
                                        key={2}
                                        svgDimensions={40}
                                        medsTaken={this.props.data}
                                        awaitingIO={this.props.awaitingIO}
                                        onPressHandler={this._selectTime}
                                />
                        ]);
                }

                return (
                        <GestureRecognizer
                                visible={this.props.modalIsVisible}
                                onSwipeDown={this.props.closeModal}
                                style={{ flex: 0 }}
                        >
                                <Modal
                                        animationType="slide"
                                        visible={this.props.modalIsVisible}
                                        onRequestClose={() => {
                                                this.setState({ timePickerVisible: false });
                                                this.props.closeModal();
                                        }}
                                        transparent={true}
                                >

                                        <View style={{
                                                height: "40%",
                                                marginTop: "auto",
                                                justifyContent: "space-evenly",
                                                alignItems: "center",
                                                backgroundColor: (this.props.data ? "#4bee9a" : "grey"),
                                                borderTopLeftRadius: 45,
                                                borderTopRightRadius: 45
                                        }}>
                                                <View style={{
                                                        marginTop: "2%",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                }}>
                                                        <Text style={{ fontWeight: 'bold', fontSize: 40, color: "white" }}>{this.props.monthName}</Text>
                                                        <Text style={{ fontWeight: 'bold', fontSize: 50, color: "white" }}>{day}</Text>
                                                        {/* <Text style={{ fontWeight: 'bold', fontSize: 20, color: "white" }}>{this.state.modalTargetDate.year}</Text> */}
                                                </View>
                                                <View style={{
                                                        flex: 1,
                                                        flexDirection: "row",
                                                        justifyContent: "space-between",
                                                        alignItems: "center",
                                                        backgroundColor: "white",
                                                        maxHeight: "40%",
                                                        width: "90%",
                                                        padding: 20,
                                                        borderRadius: 20
                                                }}>
                                                        {modalInfo}
                                                </View>
                                        </View>

                                </Modal>
                        </GestureRecognizer>
                )
        }

        _selectTime(dayTimeButtonPressed) {

                if (this.props.data != null && !dayTimeButtonPressed) {
                        let { year, month, day } = this.props.targetDate;
                        let targetDate = new Date(year, month, day);
                        this.props.updateHandler(targetDate);
                        return;
                }

                this.setState({
                        timePickerVisible: true
                });
        }

        _updateData(event, date) {

                this.setState({
                        timePickerVisible: false
                });

                if (event.type != 'set') {
                        return;
                }

                this.props.updateHandler(date);
        }

}

export default MonthDayModal;