import { Text, View } from "react-native"
import React from "react"
import Icons from 'react-native-vector-icons/EvilIcons';
import { minToTime } from "../../shared/utilsFuncations";
import Button from "../Button";
import dayjs from "dayjs";
import he from 'dayjs/locale/he'

const CurrentService = ({ serviceType, theme, arrival, notes = "" }) => {
    return (
        <View style={{ borderRadius: 25, borderColor: '#E9E9F0', borderWidth: 1.5, width: '95%', height: '28%' }}>
            <View style={{ padding: 30 }}>
                {arrival == 'Unknown' && <View style={{ backgroundColor: '#000', width: 106, height: 25, borderRadius: 9, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: '300' }} >
                        לא ידוע
                    </Text>
                </View>}
                {arrival == 'Arrival' && <View style={{ backgroundColor: '#62D0A2', width: 106, height: 25, borderRadius: 9, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: '300' }} >
                        מגיע/ה
                    </Text>
                </View>}
                {arrival == 'NotArrived' && <View style={{ backgroundColor: '#62D0A2', width: 106, height: 25, borderRadius: 9, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: '300' }} >
                        לא מגיע/ה
                    </Text>
                </View>}
                <View>
                    <Text style={{ textAlign: 'right', fontSize: 20, fontWeight: '700' }}>
                        {serviceType.name}
                    </Text>
                    <Text style={{ marginTop: 5, textAlign: 'right', fontSize: 15, fontWeight: '300' }}>
                        {notes}
                    </Text>
                </View>
            </View>
            <View style={{ borderTopWidth: 1, borderColor: '#E9E9F0', width: '100%' }}>
                <View style={{ padding: 25, flexDirection: 'row-reverse', justifyContent: "space-between" }}>

                    <Text style={{ fontSize: 20, fontWeight: '200', color: '#A9A9A9' }}>
                        מחיר
                    </Text>
                    <Text style={{ fontSize: 20, fontWeight: '200' }}>
                        {serviceType.price}₪
                    </Text>
                </View>
            </View>

        </View >
    )
}

export default CurrentService;