import { Component } from "react";
import { View } from "react-native";
import Swiper from "react-native-swiper";
import WeekView from "./WeekView";


class WeekSwiper extends Component {

        constructor(props) {
                super(props);

                let date = new Date();
                const weekStartOffset = date.getDay();

                // set date to sunday before last/current
                date.setDate(date.getDate() - weekStartOffset - 7);

                let weeks = [];
                for (let i = 0; i < 3; i++) {
                        weeks.push(new Date(date));
                        date.setDate(date.getDate() + 7);
                }

                this.state = {
                        displayWeeks: weeks,
                        key: 1
                }

                this._onPageChange = this._onPageChange.bind(this);
        }

        render() {
                return (
                        <Swiper
                                index={1}
                                key={this.state.key}
                                loop={false}
                                showsPagination={false}
                                onIndexChanged={(i) => this._onPageChange(i)}
                                style={{
                                        minHeight: "90%",
                                        justifyContent: "center",
                                        alignItems: "center"
                                }}
                        >
                                {this.state.displayWeeks.map((element, index) => {
                                        return (
                                                <WeekView key={index} date={element} />
                                        )
                                })}
                        </Swiper>
                );
        }

        _onPageChange(index) {
                if (index == 1) {
                        return
                }

                let currDisplayWeeks = this.state.displayWeeks;
                let newDisplayWeeks;
                let newDate = currDisplayWeeks[index];

                if (index == 0) {
                        newDate.setDate(newDate.getDate() - 7);
                        newDisplayWeeks = [newDate, currDisplayWeeks[0], currDisplayWeeks[1]];
                } else {
                        newDate.setDate(newDate.getDate() + 7);
                        newDisplayWeeks = [currDisplayWeeks[1], currDisplayWeeks[2], newDate];
                }

                this.setState((state) => ({
                        displayWeeks: newDisplayWeeks,
                        key: ((state.key + 1) % 2)
                }))
        }

}

export default WeekSwiper;