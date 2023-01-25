import React, { Component } from "react";
import GestureRecognizer from 'react-native-swipe-gestures';
import { View, Text, Modal, Dimensions } from "react-native";
import PillButton from './PillButton';



class MonthDayModal extends Component {

        constructor(props) {
                super(props);
        }

        render() {
                let { year, month, day } = this.props.targetDate;

                let modalInfo;
                if ((new Date(year, month, day)).getTime() > (new Date()).getTime()) {
                        modalInfo = (
                                <Text>Want to set a reminder?</Text>
                        );
                } else {
                        modalInfo = ([
                                <Text key={0}>{this.props.data}</Text>,
                                <PillButton key={1} svgDimensions={40} date={new Date(year, month, day)} />
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
                                        onRequestClose={this.props.closeModal}
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

}

export default MonthDayModal;