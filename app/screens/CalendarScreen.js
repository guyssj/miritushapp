import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ActivityIndicator, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { CalendarEvents } from '../components/Calendar'
import { useQueryClient } from 'react-query'
import api from '../api';
import { CalendarBody, CalendarContainer, CalendarHeader } from '@howljs/calendar-kit';
import { themesC, color } from '../theme';

import { useSignalR } from '../signalR/signalRContext'
import useColors from '../theme/useColors'
import CustomUnavailableHour from '../components/Calendar/CalendarUnVa'
import { Button, Typography } from '../components';
import { spacing } from '../theme';
import { calInitialLocales } from '../i18n/calendarLocale';
import { useTranslation } from 'react-i18next';
import { Calendar } from 'react-native-big-calendar';
import { addWeeks, format } from 'date-fns';
import { dateFnsLocales } from '../i18n/dateLocale';
import calendarHeader from '../components/Calendar/CalendarHeader';

const CalendarScreen = ({ navigation }) => {
    const queryClient = useQueryClient();
    const [events, setEvents] = useState([]);
    const calendarRef = useRef(null);
    const { colors } = useColors();
    const { i18n } = useTranslation();
    const [closeDays, setCloseDays] = React.useState({})
    const [lockHours, setlockHours] = React.useState({})
    // const [date, setDate] = React.useState(new Date())
    const currentLang = i18n.language || 'en';


    //BIG-CALENDAR
    // const _onPrevDate = () => {
    //     const datec = addWeeks(date, -1);
    //     setDate(datec);
    // };

    // const _onNextDate = () => {
    //     const datec = addWeeks(date, 1);
    //     setDate(datec);
    // };

    const connection = useSignalR();

    useEffect(() => {
        if (connection) {
            connection.on("BookChange", message => {
                queryClient.invalidateQueries('events')
            });
        }
    }, [connection, queryClient]);

    const _renderHeaderRight = useCallback(() => {
        return (
            <TouchableOpacity
                style={{ headerRight: { marginRight: 16 } }}
                onPress={() => {
                    calendarRef.current?.goToDate({
                        hourScroll: true,
                    });
                }}
            >
                <Typography allowFontScaling={false}>Now</Typography>
            </TouchableOpacity>
        );
    }, []);
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: _renderHeaderRight,
        });
    }, [_renderHeaderRight, navigation]);


    const evnetpress = (event) => {
        if (!event.customer) return;

        navigation.navigate('Calendar', {
            screen: 'Details',
            params: {
                screen: 'main',
                params: { customer: event.customer, meta: event.meta, serviceType: event.serviceType }
            }
        })
    }
    const onEventsSuccess = (data) => {
        data.forEach(element => {
            element.id = element.meta.id;
            element.start = { dateTime: element.start };
            element.end = { dateTime: element.end };
        });
        setEvents(prv => data);
    };

    const onLockHoursSuccess = (data) => {
        const result = {};
        data.forEach(lockHour => {
            const dateOnly = lockHour.meta.startDate.split("T")[0]; // Get just the 'YYYY-MM-DD' part
            const start = lockHour.meta.startAt;
            const end = lockHour.meta.endAt;
            if (!result[dateOnly]) {
                result[dateOnly] = [{ start: start, end: end, title: lockHour.title }];
            }
        });

        setlockHours(prv => result);
    };

    const onCloseDaySuccess = (data) => {
        const allDayEvent = data
            .filter(closeDay => !events.some(event => event.id === `cd${closeDay.id}`))
            .map(closeDay => {
                const dateOnly = closeDay.date.split("T")[0]; // Get just the 'YYYY-MM-DD' part
                return {
                    id: `cd${closeDay.id}`,
                    title: closeDay.notes,
                    start: { date: dateOnly },
                    end: { date: dateOnly },
                    color: '#ECECEC'
                };
            });

        //Mapping to the calendar object
        const result = {};
        data.forEach(entry => {
            const dateOnly = entry.date.split("T")[0]; // Get just the 'YYYY-MM-DD' part
            if (!result[dateOnly]) {
                result[dateOnly] = [{ start: 0, end: 24 * 60 }];
            }
        });


        //Adding the closeDay to unavalablile hours
        setCloseDays(result);
        //Adding the closeDay to AlldayEvents
        setEvents(oldevents => [...oldevents, ...allDayEvent]);

        //BIG-CALENDAR
        // const closeDayss = data.map(item => {
        //     return {
        //         title: item.notes,
        //         start: new Date(item.date),
        //         end: new Date(item.date),
        //         //meta: item.meta
        //     };
        // });
        // setCloseDays(closeDayss);
    }
    const { isLoading: eventsLoading, isError } = api.calendarQuery.useGetAllEvents(onEventsSuccess)
    const { isLoading: lockHourLoading } = api.calendarQuery.useGetAllLockHours(onLockHoursSuccess)
    const { isLoading: closeDayLoading } = api.calendarQuery.useGetAllCloseDays(onCloseDaySuccess)

    if (eventsLoading || lockHourLoading || closeDayLoading)
        return (<View style={{ flex: 1, justifyContent: 'center' }}><ActivityIndicator /></View>)

    if (isError)
        return (<View style={{ flex: 1, justifyContent: 'center' }}><ActivityIndicator /><Typography>Error</Typography></View>)


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <CalendarContainer
                events={events}
                initialLocales={calInitialLocales}
                locale={i18n.language}
                ref={calendarRef}
                unavailableHours={{ ...closeDays, ...lockHours }}
                numberOfDays={7}
                onPressEvent={evnetpress}
                hideWeekDays={[5, 6]}
                theme={{
                    colors: { primary: colors.primary.main }, eventContainerStyle: {
                        borderRadius: spacing[1],
                        backgroundColor: colors.backgroundTransparent,
                    },
                    textStyle: {
                        fontFamily: 'NotoSansHebrew-Regular'
                    }
                }}
                firstDay={7}>
                <CalendarHeader renderEvent={CalendarEvents} />
                <CalendarBody renderCustomUnavailableHour={(props) => {
                    return <CustomUnavailableHour {...props} />;
                }} renderEvent={CalendarEvents} />
            </CalendarContainer>
        </SafeAreaView>

        // <SafeAreaView style={{ backgroundColor: color.background, flex: 1, marginLeft: 5, marginRight: 5 }}>
        //     {/* <View style={{
        //         backgroundColor: color.palette.blue, borderTopEndRadius: 20,
        //         borderTopStartRadius: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
        //     }}>
        //         <Button style={{ backgroundColor: color.palette.blue, width: 50, margin: 5 }} title="<" onPress={_onNextDate} />
        //         <View>
        //             <Text style={{ fontSize: 25, color: color.whiteText }}>{format(date, "MMMM yyyy", { locale: dateFnsLocales[currentLang] })}</Text>
        //         </View>
        //         <Button style={{ backgroundColor: color.palette.blue, width: 50, margin: 5 }} title=">" onPress={_onPrevDate} />
        //     </View> */}
        //     <Calendar
        //         isRTL={true}
        //         date={date}
        //         locale={currentLang}
        //         hourRowHeight={90}
        //         hourStyle={{
        //             color: '#987554',
        //             fontWeight: '700',
        //             fontSize: 9
        //         }}
        //         weekStartsOn={0}
        //         weekEndsOn={6}
        //         calendarCellStyle={{ borderRightWidth: 1, borderLeftWidth: 0, borderColor: '#dddddd' }}
        //         mode={'custom'}
        //         onPressEvent={evnetpress}
        //         sortedMonthView={false}
        //         scrollOffsetMinutes={620}
        //         swipeEnabled={true}
        //         isEventOrderingEnabled={false}
        //         renderEvent={CalendarEvents}
        //         renderHeader={calendarHeader}
        //         events={[...events, ...closeDays]}
        //     theme={themesC.default}
        //     />
        // </SafeAreaView>

    )
}

export default CalendarScreen;