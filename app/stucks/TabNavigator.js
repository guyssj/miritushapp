import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import HomeStuck from './HomeStuck';
import Icons from 'react-native-vector-icons/MaterialIcons';
import CalendarStuck from './CalendarStuck';
import CustomerStuck from './CustomerStuck';
import CloseDaysStuck from './CloseDaysStuck';
import { createSignalRContext } from 'react-signalr/signalr';
import { HttpTransportType, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import ProfileScreen from '../screens/ProfileScreen';
import { useTranslation } from 'react-i18next';

const Tab = createBottomTabNavigator();

// const SignalRContext = createSignalRContext({ shareConnectionBetweenTab: true });

const TabNav = () => {
    const { t } = useTranslation();
    return (
        // <SignalRContext.Provider
        //     // connectEnabled={!!token}
        //     // accessTokenFactory={() => token}
        //     automaticReconnect={true}
        //     connectEnabled={true}
        //     onOpen={() => console.log("open")}
        //     logger={LogLevel.Debug}
        //     // skipNegotiation={true}
        //     // transport={HttpTransportType.WebSockets}
        //     // dependencies={[token]} //remove previous connection and create a new connection if changed
        //     url={"http://localhost:5070/miritushHubs"}>

        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Home" options={{
                title: t('homeScreen.title'),
                tabBarIcon: ({ color, size }) => {
                    return <Icons name="home-filled" size={size} color={color} />;
                },
            }} component={HomeStuck} />
            <Tab.Screen name="Calendar" options={{
                title: t('calendarScreen.title'),
                tabBarIcon: ({ color, size }) => {
                    return <Icons name="calendar-today" size={size} color={color} />;
                },
            }} component={CalendarStuck} />
            <Tab.Screen name="Close days" options={{
                title: t('closeDaysScreen.navTitle'),
                tabBarIcon: ({ color, size }) => {
                    return <Icons name="event-busy" size={size} color={color} />;
                },
                unmountOnBlur: true,
            }} component={CloseDaysStuck} />
            <Tab.Screen name="Customers" options={{
                title: t('customersScreen.title'),
                tabBarIcon: ({ color, size }) => {
                    return <Icons name="people-alt" size={size} color={color} />;
                },
                unmountOnBlur: true,
            }} component={CustomerStuck} />
            <Tab.Screen name="Profile" options={{
                tabBarIcon: ({ color, size }) => {
                    return <Icons name="face" size={size} color={color} />;
                },
                unmountOnBlur: true,
            }} component={ProfileScreen} />
        </Tab.Navigator>
        // </SignalRContext.Provider>
    );
};

export default TabNav;
