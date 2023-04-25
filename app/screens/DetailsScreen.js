import { Text, View } from "react-native"
import React from "react"
import { useTheme } from "../theme";
import { Actions, CurrentDates, CurrentService } from "../components/DetailsBox";
import { Button } from "../components";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { userSignInSet } from "../store/reducers/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../api";


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
        <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#FFFAF6' }}>
            <View style={{ padding: 14 }}>
                <Text style={{ fontSize: 20, fontWeight: '700' }}>{customer.firstName} {customer.lastName}</Text>
            </View>
            <CurrentDates onReschedule={() => rescheduleHandle()} book={meta} theme={theme} />
            <View style={{ padding: 5 }}></View>
            <CurrentService arrival={meta.arrival} serviceType={serviceType} />

            <View style={{ width: '80%', justifyContent: 'space-around', marginTop: 10 }}>
                <Button
                    loading={isLoading}
                    onPress={POSNav}
                    disabled={data?.id ? true : false}
                    style={{ backgroundColor: theme.palette.primary[50] }}
                    textStyle={{ color: theme.palette.primary.main, fontWeight: '700', fontSize: 20 }}
                    title={data?.id ? 'שולם' : 'קופה'} />
            </View>

            <View style={{ justifyContent: 'space-around' }}>
                <Actions book={meta} />
            </View>
        </View>
    )
}

export default DetailsScreen;