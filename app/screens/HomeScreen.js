import React, { useEffect } from 'react'
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'
import { color, themesC, useTheme } from '../theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api';
import { Calendar } from 'react-native-big-calendar'
import { Dimensions, SafeAreaView, StatusBar } from 'react-native'
import { Button } from '../components';
import dayjs from 'dayjs'
import { CalendarEvents, CalendarHeader } from '../components/Calendar';
import he from 'dayjs/locale/he'
import { useQuery } from 'react-query'
import { useDispatch, useSelector } from "react-redux";
import { userSignInSet } from '../store/reducers/user';


const HomeScreen = ({ navigation }) => {
    const [additionalEvents, setAdditionalEvents] = React.useState([])
    const [events, setEvents] = React.useState([])
    const dispatch = useDispatch();
    const [date, setDate] = React.useState(dayjs())
    const { isLoading, isError, data, error, isFetching } = useQuery("events", () => api.calendar.getAll(), {
        onSuccess: (data) => { setEvents(data ? data : []); },
        onError: async (error) => {
            error.status === 401 ? dispatch(userSignInSet(false)) : null;
            await AsyncStorage.removeItem('accessToken')
        }
    })
    const [mode, setMode] = React.useState('week')
    const evnetpress = (event) => {
        console.log(event)
        navigation.navigate('Home', {
            screen: 'Details',
            params: {
                screen: 'main',
                params: { customer: event.customer, meta: event.meta, serviceType: event.serviceType }
            }
        })
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
        let dates = dayjs(date).add(7, 'day').toDate()
        setDate(prev => dates)
    }
    const addEvent = React.useCallback(
        // (start) => {
        //     const title = 'new Event'
        //     const end = new Date(2022, 11, 6).setMinutes(120)
        //     setAdditionalEvents([...additionalEvents, { start, end, title }])
        // },
        // [additionalEvents, setAdditionalEvents],
    )

    if (isLoading) {
        return (<View style={{ flex: 1, justifyContent: 'center' }}><ActivityIndicator /></View>)
    }
    if (isError) {
        return (<View style={{ flex: 1, justifyContent: 'center' }}><ActivityIndicator /><Text>Error</Text></View>)
    }
    return (
        <SafeAreaView style={{ backgroundColor: color.palette.offWhiteBack, flex: 1 }}>
            <View style={{ margin: 15 }}>
                <View style={{
                    backgroundColor: color.palette.blue, borderTopEndRadius: 20,
                    borderTopStartRadius: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
                }}>
                    <Button style={{ backgroundColor: color.palette.blue, width: 50, margin: 5 }} title="<" onPress={_onNextDate} />
                    <View>
                        <Text style={{ fontSize: 25, color: color.whiteText }}>{dayjs(date).locale(he).format('MMMM YYYY')}</Text>
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
                    locale={he}
                    hourStyle={{
                        color: themesC.default.palette.primary.main,
                        fontWeight: '700',
                        borderRadius: 10
                    }}
                    swipeEnabled={false}
                    scrollOffsetMinutes={620}
                    renderEvent={CalendarEvents}
                    renderHeader={CalendarHeader}
                    onPressEvent={evnetpress}
                    sortedMonthView={true}
                    mode={mode}
                    overlapOffset={'6'}
                    theme={themesC['default']}
                />
            </View>
        </SafeAreaView>)
}

export default HomeScreen;