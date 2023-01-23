import React, { Component } from "react";
import GestureRecognizer from 'react-native-swipe-gestures';
import { View, Text, Modal, Dimensions } from "react-native";
import PillButton from './PillButton';



class MonthDayModal extends Component {

        constructor(props) {
                super(props);
        }

        render() {

                let { width, height } = Dimensions.get("window");
                return (
                        // <View
                        //         style={{
                        //                 flex: 1,
                        //                 position: "absolute",
                        //                 left: 0,
                        //                 top: 0,
                        //                 height: height,
                        //                 width: width,
                        //                 backgroundColor: "rgba(0,0,0,0.3)",
                        //         }}
                        // >
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
                                                        <Text style={{ fontWeight: 'bold', fontSize: 50, color: "white" }}>{this.props.targetDate.day}</Text>
                                                        {/* <Text style={{ fontWeight: 'bold', fontSize: 20, color: "white" }}>{this.state.modalTargetDate.year}</Text> */}
                                                </View>
                                                <View style={{
                                                        flex: 1,
                                                        flexDirection: "row",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        backgroundColor: "white",
                                                        maxHeight: "40%",
                                                        width: "90%",
                                                        borderRadius: 20
                                                }}>

                                                </View>
                                        </View>

                                </Modal>
                        </GestureRecognizer>
                        // </View>
                )
        }

}

export default MonthDayModal;