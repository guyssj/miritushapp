import { Text, View } from "react-native"
import React from "react"
import Icons from 'react-native-vector-icons/EvilIcons';
import { minToTime } from "../../shared/utilsFuncations";
import Button from "../Button";
import dayjs from "dayjs";
import he from 'dayjs/locale/he'

const CurrentDates = ({ book, theme, onReschedule }) => {
    return (
        <View style={{ padding: 30, borderRadius: 25, borderColor: '#E9E9F0', borderWidth: 1.5, width: '95%', height: '29%' }}>
            <View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
                <View style={{
                    marginStart: 15,
                    backgroundColor: 'rgba(236, 117, 135, 0.2)',
                    width: 35,
                    height: 35,
                    borderRadius: 10,
                    justifyContent: 'center', alignItems: 'center'
                }}>
                    <Icons name="calendar" color={"#EC7587"} size={25} />
                </View>
                <Text style={{ fontSize: 20 }}>
                    {minToTime(book.startAt)}-{minToTime(book.startAt + book.duration)}
                </Text>
            </View>
            <View style={{ flexDirection: 'row-reverse', paddingTop: 10, alignItems: 'center' }}>
                <View style={{
                    marginStart: 15,
                    backgroundColor: 'rgba(236, 117, 135, 0.2)',
                    width: 35,
                    height: 35,
                    borderRadius: 10,
                    justifyContent: 'center', alignItems: 'center'
                }}>
                    <Icons name="clock" color={"#EC7587"} size={25} />
                </View>
                <Text style={{ fontSize: 20 }}>
                    יום {dayjs(book.startDate).locale(he).format('dddd, D MMMM, YYYY')}
                </Text>
            </View>
            <View style={{ width: '100%', marginTop: 10 }}>
                <Button onPress={onReschedule} style={{ backgroundColor: theme.palette.primary[200] }} textStyle={{ color: theme.palette.primary.main, fontWeight: '700', fontSize: 20 }} title={'שינוי התור'} />
            </View>
        </View>
    )
}

export default CurrentDates;