import { Text, View } from "react-native"
import React from "react"
import { useTheme } from "../theme";
import { Actions, CurrentDates, CurrentService } from "../components/DetailsBox";


const DetailsScreen = ({ route, navigation }) => {
    console.log(route);
    const { customer, meta, serviceType } = route.params;
    const theme = useTheme();

    const rescheduleHandle = () => {
        console.log("RESCHDULE")
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
            <View style={{ padding: 14 }}>
                <Text style={{ fontSize: 20, fontWeight: '700' }}>{customer.firstName} {customer.lastName}</Text>
            </View>
            <CurrentDates onReschedule={() => rescheduleHandle()} book={meta} theme={theme} />
            <View style={{ padding: 5 }}></View>
            <CurrentService arrival={meta.arrival} serviceType={serviceType} />

            <View style={{ justifyContent: 'flex-end' }}>
                <Actions book={meta} />
            </View>
        </View>
    )
}

export default DetailsScreen;