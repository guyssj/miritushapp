import React, { useEffect } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { color, themesC, useTheme } from '../theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api';
import { Calendar } from 'react-native-big-calendar'
import { Dimensions, SafeAreaView, StatusBar } from 'react-native'
import { Button } from '../components';
import dayjs from 'dayjs'
import 'dayjs/locale/he'
import { CalendarEvents, CalendarHeader } from '../components/Calendar';

const GetEvents = async () => {
    const eventsss = await api.calendar.getAll();
    return newEvents = eventsss.map(item => {
        return {
            title: item.title,
            start: new Date(item.start),
            end: new Date(item.end),
            color: item.customer.color
        }
    });
}

const HomeScreen = () => {
    const [additionalEvents, setAdditionalEvents] = React.useState([])
    const [events, setEvents] = React.useState([])
    const [date, setDate] = React.useState(new Date())

    const [mode, setMode] = React.useState('custom')
    useEffect(() => {
        (async () => {
            setEvents(await GetEvents())
        })();
    }, []);

    const evnetpress = (event) => {
        console.log(event)
    }

    const _onPrevDate = () => {
        if (mode === 'month') {
            setDate(
                dayjs(date)
                    .add(dayjs(date).date() * -1, 'day')
                    .toDate(),
            )
        } else {
            setDate(
                dayjs(date)
                    .add(7 * -1, 'day')
                    .toDate(),
            )
        }
    }

    const _onNextDate = () => {
        setDate(dayjs(date).add(7, 'day').toDate())
    }
    const addEvent = React.useCallback(
        // (start) => {
        //     const title = 'new Event'
        //     const end = new Date(2022, 11, 6).setMinutes(120)
        //     setAdditionalEvents([...additionalEvents, { start, end, title }])
        // },
        // [additionalEvents, setAdditionalEvents],
    )
    return (
        <SafeAreaView style={{ backgroundColor: color.palette.offWhiteBack, flex: 1 }}>
            <View style={{ margin: 15 }}>
                <View style={{
                    backgroundColor: color.palette.blue, borderTopEndRadius: 20,
                    borderTopStartRadius: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
                }}>
                    <Button style={{ backgroundColor: color.palette.blue, width: 50, margin: 5 }} title="<" onPress={_onNextDate} />
                    <View>
                        <Text style={{ fontSize: 25, color: color.whiteText }}>{dayjs(date).format('MMMM YYYY')}</Text>
                    </View>
                    <Button style={{ backgroundColor: color.palette.blue, width: 50, margin: 5 }} title=">" onPress={_onPrevDate} />
                </View>
                <Calendar
                    isRTL={true}
                    date={date}
                    height={Dimensions.get('window').height}
                    events={[...events, ...additionalEvents]}
                    onPressCell={addEvent}
                    hourRowHeight={80}
                    headerContentStyle={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    weekDayHeaderHighlightColor={"#000"}
                    locale={"he"}
                    swipeEnabled={false}
                    scrollOffsetMinutes={620}
                    showAllDayEventCell={false}
                    renderEvent={CalendarEvents}
                    renderHeader={CalendarHeader}
                    onPressEvent={evnetpress}
                    sortedMonthView={true}
                    mode={mode}
                    theme={themesC['default']}
                />
            </View>
        </SafeAreaView>)
}

export default HomeScreen;