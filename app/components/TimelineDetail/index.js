import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { format } from 'date-fns'
import { useTheme } from '../../theme'

const TimelineDetail = ({ rowData, sectionID, rowID }) => {
    const theme = useTheme()

    return (
        <View style={{ flex: 1, marginTop: -10 }}>
            <Text style={{ color: theme.palette.primary.main, padding: 2 }}>
                {format(new Date(rowData.createdDate), "dd MMMM yyyy")}
            </Text>
            <View style={{
                backgroundColor: theme.palette.primary[50],
                borderRadius: 8,
                marginBottom: 10
            }}>
                <View style={[styles.lineContainer, { backgroundColor: theme.palette.primary.main }]}></View>
                <View style={styles.eventContainer}>
                    <View style={styles.timeAndTypeContainer}>
                        <Text style={[styles.timeText, { color: theme.palette.primary.main }]}> {format(new Date(rowData.createdDate), "HH:MM:ss")}</Text>
                        <View style={styles.typeContainer}>
                            <View style={[styles.typeCircleDot, { backgroundColor: theme.palette.primary.main }]}></View>
                            <Text>{rowData.type}</Text>
                        </View>
                    </View>
                    <View style={{ marginBottom: 20 }} >
                        <Text style={{ fontSize: 18, fontWeight: '700' }}>{rowData.description}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text>
                            {rowData.notes}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    lineContainer: {
        position: 'absolute',
        height: '90%',
        width: '1%',
        borderRadius: 8,
        margin: 5
    },
    eventContainer: {
        padding: 20
    },
    timeAndTypeContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    timeText: {
        fontSize: 17
    },
    typeContainer: {
        backgroundColor: 'white',
        borderRadius: 6,
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    typeCircleDot: {
        width: 7,
        height: 7,
        marginRight: 5,
        borderRadius: 50
    }
});


export default TimelineDetail;