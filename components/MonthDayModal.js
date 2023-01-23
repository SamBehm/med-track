import React, { Component } from "react";
import GestureRecognizer from 'react-native-swipe-gestures';
import { View, Text, Modal } from "react-native";
import PillButton from './PillButton';



class MonthDayModal extends Component {

        constructor(props) {
                super(props);
        }

        render() {
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
                                        targetDate={this.props.targetDate}
                                >
                                        <View style={{
                                                flex: 1,
                                                justifyContent: "flex-end",
                                                alignItems: "center",
                                                backgroundColor: (this.props.data ? "#4bee9a" : "grey")
                                        }}>
                                                <View style={{
                                                        marginBottom: "15%",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                }}>
                                                        <Text style={{ fontWeight: 'bold', fontSize: 40, color: "white" }}>{this.props.monthName}</Text>
                                                        <Text style={{ fontWeight: 'bold', fontSize: 50, color: "white" }}>{this.props.targetDate.day}</Text>
                                                        {/* <Text style={{ fontWeight: 'bold', fontSize: 20, color: "white" }}>{this.state.modalTargetDate.year}</Text> */}
                                                </View>
                                                <View style={{
                                                        flex: 1,
                                                        flexDirection: "row",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        backgroundColor: "white",
                                                        maxHeight: "70%",
                                                        width: "100%",
                                                        borderTopLeftRadius: 45,
                                                        borderTopRightRadius: 45
                                                }}>
                                                        {/* Insert Stuff Here*/}
                                                </View>
                                        </View>
                                </Modal>
                        </GestureRecognizer>
                )
        }

}

export default MonthDayModal;