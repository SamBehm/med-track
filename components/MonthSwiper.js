import { Component } from "react";
import Swiper from "react-native-swiper";
import MonthView from "./MonthView";

class MonthSwiper extends Component {

        constructor(props) {
                super(props);

                let date = new Date();
                date.setMonth(date.getMonth() - 1);

                let months = [];
                for (let i = 0; i < 3; i++) {
                        months.push([date.getFullYear(), date.getMonth()]);
                        date.setMonth(date.getMonth() + 1);
                }

                this.state = {
                        displayMonths: months,
                        key: 1
                };

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
                                {this.state.displayMonths.map((element, index) => {
                                        return (
                                                <MonthView key={index} year={element[0]} month={element[1]} />
                                        )
                                })}
                        </Swiper>
                )
        }

        _onPageChange(index) {

                // ##TODO: Can be simplified (lots of redundancy)
                if (index == 0) {
                        let date = new Date(this.state.displayMonths[0][0], this.state.displayMonths[0][1] - 1, 1);
                        let newDisplayMonths = [];
                        for (let i = 0; i < 3; i++) {
                                newDisplayMonths.push([date.getFullYear(), date.getMonth()]);
                                date.setMonth(date.getMonth() + 1);
                        }

                        this.setState((state) => ({
                                displayMonths: newDisplayMonths,
                                key: ((state.key + 1) % 2)
                        }));
                } else if (index == 2) {
                        let date = new Date(this.state.displayMonths[1][0], this.state.displayMonths[1][1], 1);
                        let newDisplayMonths = [];
                        for (let i = 0; i < 3; i++) {
                                newDisplayMonths.push([date.getFullYear(), date.getMonth()]);
                                date.setMonth(date.getMonth() + 1);
                        }

                        this.setState((state) => ({
                                displayMonths: newDisplayMonths,
                                key: ((state.key + 1) % 2)
                        }));

                }
        }
}

export default MonthSwiper;