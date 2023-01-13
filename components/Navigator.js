import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainScreen from '../screens/MainScreen';
import CalendarScreen from '../screens/CalendarScreen';
import AnalyticsScreen from '../screens/AnalyticsScreen';
import { PillSVG, CalendarSVG, GraphSVG } from './SVGs';

const Tab = createBottomTabNavigator();

export default function Navigator() {
        return (
                <NavigationContainer>
                        <Tab.Navigator screenOptions={{ headerShown: false }}>
                                <Tab.Screen
                                        name="Home"
                                        component={MainScreen}
                                        options={{
                                                tabBarIcon: ({ size, focused, color }) => {
                                                        let strokeColor = "#000", opacity = 0.6;
                                                        if (focused) {
                                                                strokeColor = "#4bee9a";
                                                                opacity = 1;
                                                        }
                                                        return (
                                                                <PillSVG width={25} height={25} color={strokeColor} opacity={opacity} />
                                                        );
                                                },
                                                tabBarActiveTintColor: 'green'
                                        }}
                                />
                                <Tab.Screen
                                        name="Calendar"
                                        component={CalendarScreen}
                                        options={{
                                                tabBarIcon: ({ size, focused, color }) => {
                                                        let strokeColor = "#000", opacity = 0.6;
                                                        if (focused) {
                                                                strokeColor = "#4bee9a";
                                                                opacity = 1;
                                                        }
                                                        return (
                                                                <CalendarSVG width={25} height={25} color={strokeColor} opacity={opacity} />
                                                        )
                                                },
                                                tabBarActiveTintColor: 'green'
                                        }}
                                />
                                <Tab.Screen
                                        name="Analytics"
                                        component={AnalyticsScreen}
                                        options={{
                                                tabBarIcon: ({ size, focused, color }) => {
                                                        let strokeColor = "#000", opacity = 0.6;
                                                        if (focused) {
                                                                strokeColor = "#4bee9a";
                                                                opacity = 1;
                                                        }
                                                        return <GraphSVG width={25} height={25} color={strokeColor} opacity={opacity} />
                                                },
                                                tabBarActiveTintColor: 'green'
                                        }}
                                />
                        </Tab.Navigator>
                </NavigationContainer>
        );
}


