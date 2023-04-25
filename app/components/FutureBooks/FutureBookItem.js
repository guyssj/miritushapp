import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { format } from 'date-fns'
import Icons from 'react-native-vector-icons/EvilIcons';
import { color, useTheme } from '../../theme';
import { minToTime } from '../../shared/utilsFuncations';
import Button from '../Button';

const FutureBookItem = ({ onItemPressCancel, onItemPressReschdule, item }) => {
    const theme = useTheme();
    return (
        <View style={[styles.cardContainer, { backgroundColor: theme.palette.primary.main }]}>
            <View style={{ justifyContent: 'space-between', width: 370, flexDirection: 'row', paddingLeft: 15, paddingRight: 15 }}>
                <View style={[styles.cardHeader, { backgroundColor: theme.palette.primary[200] }]}>
                    <Text style={{ fontSize: 16, color: theme.palette.primary.contrastText, fontWeight: '700' }}>
                        {format(new Date(item.startDate), "dd MMMM")}
                    </Text>
                </View>
                <Icons name="clock" color={theme.palette.primary.contrastText} size={30} />
            </View>
            <View style={styles.cardBody}>
                <Text style={{
                    margin: 5,
                    fontSize: 25,
                    fontWeight: '700',
                    color: theme.palette.primary.contrastText
                }}> {item.serviceType.name} </Text>

                <Text style={{
                    fontSize: 20,
                    fontWeight: '300',
                    color: theme.palette.primary.contrastText
                }}>
                    {minToTime(item.startAt)} - {minToTime(item.startAt + item.duration)}
                </Text>
            </View>
            <View style={styles.cardButtons}>
                <Button title={'Reschdule'} style={styles.buttonsStyle} />
                <Button title={'Cancel book'} onPress={onItemPressCancel} style={styles.buttonsStyle} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        margin: 3,
        borderRadius: 16,
        justifyContent: 'center',
        height: '27%'
    },
    cardHeader: {
        width: 100,
        padding: 4,
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardBody: {
        alignItems: 'center'
    },
    cardButtons: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },
    buttonsStyle: {
        borderColor: '#FFF',
        borderWidth: 1,
        paddingVertical: 5,
        padding: 15,
        margin: 4
    }

});

export default FutureBookItem