import { Calendar } from '../../build'
import React, { useCallback, useMemo, useRef } from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { color, themesC } from '../theme'
import { Button } from '../components'
import { addDays, format, addWeeks } from 'date-fns'
import { CalendarEvents, CalendarHeader } from '../components/Calendar'
import { he } from 'date-fns/locale';
import he2 from 'dayjs/locale/he';
import { useQuery } from 'react-query'
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api';
import { useDispatch } from 'react-redux'
import { userSignInSet } from '../store/reducers/user'

const CalendarScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const evnetpress = (event) => {
        if (!event.customer) {
            console.log(event);
            return;
        }
        // handlePresentModalPress();
        navigation.navigate('Calendar', {
            screen: 'Details',
            params: {
                screen: 'main',
                params: { customer: event.customer, meta: event.meta, serviceType: event.serviceType }
            }
        })
    }
    const { isLoading, isError, data, error, isFetching } = useQuery("events", () => api.calendar.getAll(), {
        onError: async (error) => {
            error.status === 401 ? dispatch(userSignInSet(false)) : null;
            await AsyncStorage.removeItem('accessToken')
        }
    })
    const { isLoading: lockHourLoading, isError: lockHourIsError, data: LockHours, error: lockHourError, isFetching: lockHourFetching } = useQuery("lockHours", () => api.calendar.getAllLockHours(), {
        onError: async (error) => {
            error.status === 401 ? dispatch(userSignInSet(false)) : null;
            await AsyncStorage.removeItem('accessToken')
        }
    })
    const { isLoading: closeDayLoading, isError: closeDayIsError, data: closeDays2, error: closeDayError, isFetching: closeDayFetching } = useQuery("closeDays", () => api.calendar.getAllCloseDays(), {
        onError: async (error) => {
            error.status === 401 ? dispatch(userSignInSet(false)) : null;
            await AsyncStorage.removeItem('accessToken')
        },
        onSuccess: async (data) => {
            const closeDayss = data.map(item => {
                return {
                    title: item.notes,
                    start: new Date(item.date),
                    end: new Date(item.date)
                    //meta: item.meta
                }
            })
            setCloseDays(closeDayss)
        }
    })
    const [date, setDate] = React.useState(new Date())
    const [closeDays, setCloseDays] = React.useState([])
    const _onPrevDate = () => {
        const datec = addWeeks(date, -1)
        setDate(datec);
    }

    const _onNextDate = () => {
        const datec = addWeeks(date, 1)
        setDate(datec);
    }
    if (isLoading || lockHourLoading || closeDayLoading) {
        return (<View style={{ flex: 1, justifyContent: 'center' }}><ActivityIndicator /></View>)
    }
    if (isError) {
        return (<View style={{ flex: 1, justifyContent: 'center' }}><ActivityIndicator /><Text>Error</Text></View>)
    }
    return (
        <SafeAreaView style={{ backgroundColor: color.palette.offWhiteBack, flex: 1, marginLeft: 5, marginRight: 5 }}>
            <View style={{
                backgroundColor: color.palette.blue, borderTopEndRadius: 20,
                borderTopStartRadius: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
            }}>
                <Button style={{ backgroundColor: color.palette.blue, width: 50, margin: 5 }} title="<" onPress={_onNextDate} />
                <View>
                    <Text style={{ fontSize: 25, color: color.whiteText }}>{format(date, "MMMM yyyy", { locale: he })}</Text>
                </View>
                <Button style={{ backgroundColor: color.palette.blue, width: 50, margin: 5 }} title=">" onPress={_onPrevDate} />
            </View>
            <Calendar
                isRTL
                date={date}
                locale={he2}
                hourRowHeight={90}
                hourStyle={{
                    color: '#987554',
                    fontWeight: '700',
                    fontSize: 9
                }}
                weekStartsOn={0}
                weekEndsOn={5}
                calendarCellStyle={{ borderRightWidth: 1 }}
                mode={"custom"}
                onPressEvent={evnetpress}
                sortedMonthView={false}
                scrollOffsetMinutes={620}
                isEventOrderingEnabled={false}
                renderEvent={CalendarEvents}
                renderHeader={CalendarHeader}
                events={[...data, ...LockHours, ...closeDays]}
                theme={themesC['default']}
                height={650} />
        </SafeAreaView>

    )
}

export default CalendarScreen;