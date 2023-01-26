import { Component } from "react";
import { View } from "react-native";


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

        }

        render() {
                return (
                        <View></View>
                )
        }

}

export default WeekSwiper;