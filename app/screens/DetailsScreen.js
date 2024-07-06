import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React from "react"
import { useTheme } from "../theme";
import { Actions } from "../components/DetailsBox";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { userSignInSet } from "../store/reducers/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../api";
import { minToTime } from "../shared/utilsFuncations";
import dayjs from "dayjs";
import he from 'dayjs/locale/he'
import { Button } from "../components";


const DetailsScreen = ({ route, navigation }) => {
    console.log(route);
    const { customer, meta, serviceType } = route.params;
    const theme = useTheme();
    const dispatch = useDispatch();
    const rescheduleHandle = () => {
        console.log(meta, "RESCHDULE")
    }
    const { isLoading, isError, data, error, isFetching } = useQuery(['transaction', meta.id], () => api.calendar.getTransactionByBook(meta.id), {
        onError: async (error) => {
            navigation.goBack();
            error.status === 401 ? dispatch(userSignInSet(false)) : null;
            await AsyncStorage.removeItem('accessToken')
        }
    })
    // getTransactionByBook
    const POSNav = () => {
        navigation.goBack();
        navigation.navigate('Calendar', {
            screen: 'POSCalendar',
            params: {
                screen: 'Posmain',
                params: { serviceType: serviceType, customerId: customer.id, bookId: meta.id, title: `${customer.firstName} ${customer.lastName}` }
            }
        })
    }

    return (
        // <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#FFFAF6' }}>
        //     <View style={{ padding: 14 }}>
        //         <Text style={{ fontSize: 20, fontWeight: '700' }}>{customer.firstName} {customer.lastName}</Text>
        //     </View>
        //     <CurrentDates onReschedule={() => rescheduleHandle()} book={meta} theme={theme} />
        //     <View style={{ padding: 5 }}></View>
        //     <CurrentService arrival={meta.arrival} serviceType={serviceType} />

        //     <View style={{ width: '80%', justifyContent: 'space-around', marginTop: 10 }}>
        //         <Button
        //             loading={isLoading}
        //             onPress={POSNav}
        //             disabled={data?.id ? true : false}
        //             style={{ backgroundColor: theme.palette.primary[50] }}
        //             textStyle={{ color: theme.palette.primary.main, fontWeight: '700', fontSize: 20 }}
        //             title={data?.id ? 'שולם' : 'קופה'} />
        //     </View>

        //     <View style={{ justifyContent: 'space-around' }}>
        //         <Actions book={meta} />
        //     </View>
        // </View>
        <View style={styles.sheetContainer}>
            {/* Appointment Details */}
            <Text style={styles.heading}>Appointment Details</Text>

            <View style={styles.indicatorContainer}>
                <Text style={styles.customerName}>
                    {customer.firstName} {customer.lastName}
                </Text>
                <Text style={[styles.indicatorValue, { color: meta.arrival == 'Arrival' ? '#2ecc71' : '#e74c3c', }]}>
                    {meta.arrival == 'Arrival' ? 'הלקוח מגיע' : 'הלקוח לא מגיע'}
                </Text>

            </View>
            {/* Date and Time */}
            <View style={styles.dateTimeContainer}>
                <View style={styles.dateTimeItem}>
                    <Text style={styles.dateTimeLabel}>Date:</Text>
                    <Text style={styles.dateTimeValue}>  יום {dayjs(meta.startDate).locale(he).format('dddd, D MMMM, YYYY')}</Text>
                </View>
                <View style={styles.dateTimeItem}>
                    <Text style={styles.dateTimeLabel}>Time:</Text>
                    <Text style={styles.dateTimeValue}> {minToTime(meta.startAt)}-{minToTime(meta.startAt + meta.duration)}</Text>
                </View>
                <View style={styles.dateTimeItem}>
                    <Text style={styles.dateTimeLabel}>Service:</Text>
                    <Text style={styles.dateTimeValue}>{serviceType.name}</Text>
                </View>
            </View>

            {/* Total Price */}
            <View style={styles.totalPriceContainer}>
                <Text style={styles.totalPriceLabel}>Total Price:</Text>
                <Text style={styles.totalPriceValue}>$ {serviceType.price}</Text>
            </View>
            <View style={styles.horizontalRule} />

            {/* Reschedule Button */}
            <Button style={[styles.rescheduleButton, { backgroundColor: theme.palette.secondary.main }]} title={'Reschdule'} onPress={rescheduleHandle}>
            </Button>
            {/* <View style={{ width: '80%', justifyContent: 'space-around', marginTop: 10 }}>
                <Button
                    loading={isLoading}
                    onPress={POSNav}
                    disabled={data?.id ? true : false}
                    style={{ backgroundColor: theme.palette.primary[50] }}
                    textStyle={{ color: theme.palette.primary.main, fontWeight: '700', fontSize: 20 }}
                    title={data?.id ? 'שולם' : 'קופה'} />
            </View> */}
            {/* Customer Status Indicator */}

            {/* Pay Button */}

            <View style={{ height: '55%' }}>
                <Button disabled={data?.id ? true : false} style={styles.payButton} title={data?.id ? 'שולם' : 'קופה'} onPress={POSNav}>
                </Button>
                <Actions book={meta} />
            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    sheetContainer: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 15
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        alignSelf: 'center'
    },
    customerName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 10,
    },
    dateTimeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    dateTimeItem: {
        flex: 1,
    },
    dateTimeLabel: {
        fontSize: 14,
        color: '#555',
    },
    dateTimeValue: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    totalPriceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    totalPriceLabel: {
        fontSize: 16,
        color: '#555',
    },
    totalPriceValue: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    horizontalRule: {
        borderBottomColor: '#ddd', // Light gray
        borderBottomWidth: 1,
        marginVertical: 10,
    },

    rescheduleButton: {
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    indicatorContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    indicatorValue: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    payButton: {
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
});

export default DetailsScreen;