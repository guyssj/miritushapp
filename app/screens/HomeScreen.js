import React, { useRef } from 'react'
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { color } from '../theme';
import { SafeAreaView } from 'react-native'
import { useDispatch } from "react-redux";
import { ExpandableCalendar, Agenda, AgendaList, CalendarProvider, WeekCalendar } from 'react-native-calendars';
import { useCallback, useMemo } from 'react';


const today = new Date().toISOString().split('T')[0];
const fastDate = getPastDate(3);
const futureDates = getFutureDates(12);
const dates = [fastDate, today].concat(futureDates);

export const agendaItems = [
    {
        title: dates[0],
        data: [{ hour: '12am', duration: '1h', title: 'First Yoga' }]
    },
    {
        title: dates[1],
        data: [
            { hour: '4pm', duration: '1h', title: 'Pilates ABC' },
            { hour: '5pm', duration: '1h', title: 'Vinyasa Yoga' }
        ]
    },
    {
        title: dates[2],
        data: [
            { hour: '1pm', duration: '1h', title: 'Ashtanga Yoga' },
            { hour: '2pm', duration: '1h', title: 'Deep Stretches' },
            { hour: '3pm', duration: '1h', title: 'Private Yoga' }
        ]
    },
    {
        title: dates[3],
        data: [{ hour: '12am', duration: '1h', title: 'Ashtanga Yoga' }]
    },
    {
        title: dates[4],
        data: [{}]
    },
    {
        title: dates[5],
        data: [
            { hour: '9pm', duration: '1h', title: 'Middle Yoga' },
            { hour: '10pm', duration: '1h', title: 'Ashtanga' },
            { hour: '11pm', duration: '1h', title: 'TRX' },
            { hour: '12pm', duration: '1h', title: 'Running Group' }
        ]
    },
    {
        title: dates[6],
        data: [
            { hour: '12am', duration: '1h', title: 'Ashtanga Yoga' }
        ]
    },
    {
        title: dates[7],
        data: [{}]
    },
    {
        title: dates[8],
        data: [
            { hour: '9pm', duration: '1h', title: 'Pilates Reformer' },
            { hour: '10pm', duration: '1h', title: 'Ashtanga' },
            { hour: '11pm', duration: '1h', title: 'TRX' },
            { hour: '12pm', duration: '1h', title: 'Running Group' }
        ]
    },
    {
        title: dates[9],
        data: [
            { hour: '1pm', duration: '1h', title: 'Ashtanga Yoga' },
            { hour: '2pm', duration: '1h', title: 'Deep Stretches' },
            { hour: '3pm', duration: '1h', title: 'Private Yoga' }
        ]
    },
    {
        title: dates[10],
        data: [
            { hour: '12am', duration: '1h', title: 'Last Yoga' }
        ]
    },
    {
        title: dates[11],
        data: [
            { hour: '1pm', duration: '1h', title: 'Ashtanga Yoga' },
            { hour: '2pm', duration: '1h', title: 'Deep Stretches' },
            { hour: '3pm', duration: '1h', title: 'Private Yoga' }
        ]
    },
    {
        title: dates[12],
        data: [
            { hour: '12am', duration: '1h', title: 'Last Yoga' }
        ]
    },
    {
        title: dates[13],
        data: [
            { hour: '12am', duration: '1h', title: 'Last Yoga' }
        ]
    }
];
function getFutureDates(numberOfDays) {
    const array = [];
    for (let index = 1; index <= numberOfDays; index++) {
        let d = Date.now();
        if (index > 8) {
            // set dates on the next month
            const newMonth = new Date(d).getMonth() + 1;
            d = new Date(d).setMonth(newMonth);
        }
        const date = new Date(d + 864e5 * index); // 864e5 == 86400000 == 24*60*60*1000
        const dateString = date.toISOString().split('T')[0];
        array.push(dateString);
    }
    return array;
}
function getPastDate(numberOfDays) {
    return new Date(Date.now() - 864e5 * numberOfDays).toISOString().split('T')[0];
}



const HomeScreen = ({ navigation }) => {
    const [additionalEvents, setAdditionalEvents] = React.useState([])
    const [events, setEvents] = React.useState([])
    const dispatch = useDispatch();
    const [date, setDate] = React.useState(new Date())
    const [mode, setMode] = React.useState('custom')

    // ref
    const bottomSheetModalRef = useRef(null);

    // variables
    const snapPoints = useMemo(() => ['25%', '50%'], []);

    // callbacks
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);
    const handleSheetChanges = useCallback((index) => {
        console.log('handleSheetChanges', index);
    }, []);

    const renderItem = (reservation, isFirst) => {
        const fontSize = isFirst ? 16 : 14;
        const color = isFirst ? 'black' : '#43515c';
        return (
            <TouchableOpacity
                style={[{
                    height: reservation.height, flex: 1, backgroundColor: 'white',
                    borderRadius: 5,
                    padding: 10,
                    marginRight: 10,
                    marginTop: 17
                }]}
                onPress={() => Alert.alert(reservation.item.title)}
            >
                <Text style={{ fontSize, color }}>{reservation.item.title}</Text>
            </TouchableOpacity>
        );
    }

    return (
        <SafeAreaView style={{ backgroundColor: color.palette.offWhiteBack, flex: 1 }}>
            {/* <View style={{ margin: 5, flex: 1 }}>
                <CalendarProvider
                    date={agendaItems[1]?.title}
                // onDateChanged={onDateChanged}
                // onMonthChange={onMonthChange}
                // disabledOpacity={0.6}
                // todayBottomMargin={16}
                >
                    <WeekCalendar firstDay={1} />
                    <AgendaList
                        renderItem={renderItem}
                        sections={agendaItems}
                    // scrollToNextEvent
                    // dayFormat={'yyyy-MM-d'}
                    />
                </CalendarProvider>
            </View> */}

        </SafeAreaView>)
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        backgroundColor: 'grey',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
});



export default HomeScreen;

