import { Component } from "react";
import { View } from "react-native";
import Swiper from "react-native-swiper";
import WeekView from "./WeekView";


class WeekSwiper extends Component {

        constructor(props) {
                super(props);

                let date = new Date();
                let weekDayOffset = date.getDay();

                date.setDate(date.getDate() - (weekDayOffset + 7));

                let weeks = [];
                for (let i = 0; i < 3; i++) {
                        weeks.push([date.getFullYear(), date.getMonth(), date.getDate()]);
                        date.setDate(date.getDate() + 7);
                }

                this.state = {
                        displayWeeks: weeks,
                        key: 1
                }
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
                                        height: "100%",
                                        justifyContent: "center",
                                        alignItems: "center"
                                }}
                        >
                                {this.state.displayWeeks.map((element, i) => {
                                        return (
                                                <WeekView key={i} date={new Date(element[0], element[1], element[2])} index={i} />
                                        )
                                })}
                        </Swiper>
                );
        }

        _onPageChange(index) {

                if (index == 1) {
                        return;
                }

                let newDisplayWeeks;
                let currentDisplayWeeks = this.state.displayWeeks;
                let temp = [...currentDisplayWeeks[index]];
                temp[2] += (7 * (index - 1));

                if (index > 1) {
                        newDisplayWeeks = [currentDisplayWeeks[1], currentDisplayWeeks[2], updateDateValues(temp)];
                } else {
                        newDisplayWeeks = [updateDateValues(temp), currentDisplayWeeks[0], currentDisplayWeeks[1]];
                }

                this.setState((state) => ({
                        displayWeeks: newDisplayWeeks,
                        key: ((state.key + 1) % 2)
                }));
        }

}

function updateDateValues(weekDate) {
        let date = new Date(weekDate[0], weekDate[1], weekDate[2]);
        return [date.getFullYear(), date.getMonth(), date.getDate()];
}

export default WeekSwiper;