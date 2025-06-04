import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { format } from 'date-fns'
import useStyles from '../../theme/useStyles'
import Typography from '../Typography/Typography'

const TimelineDetail = ({ rowData, sectionID, rowID }) => {
    const { colors, styles } = useStyles(createStyles)
    return (
        <View style={{ flex: 1, marginTop: -12 }}>
            <Typography style={{ color: colors.primary.main }}>
                {format(new Date(rowData.createdDate), "dd MMMM yyyy")}
            </Typography>
            <View style={styles.timeLineCardContainer}>
                <View style={styles.lineContainer}></View>
                <View style={styles.eventContainer}>
                    <View style={styles.timeAndTypeContainer}>
                        <Typography style={styles.timeText}> {format(new Date(rowData.createdDate), "HH:MM:ss")}</Typography>
                        <View style={styles.typeContainer}>
                            <View style={styles.typeCircleDot}></View>
                            <Typography variant='caption'>{rowData.type}</Typography>
                        </View>
                    </View>
                    <View style={{ marginBottom: 20 }} >
                        <Typography>{rowData.description}</Typography>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Typography>
                            {rowData.notes}
                        </Typography>
                    </View>
                </View>
            </View>
        </View>
    )
}

const createStyles = (colors, spacing) =>
    StyleSheet.create({
        lineContainer: {
            position: 'absolute',
            height: '90%',
            width: '1%',
            borderRadius: spacing[3],
            margin: spacing[2],
            backgroundColor: colors.primary.main
        },
        timeLineCardContainer: {
            backgroundColor: colors.primary[50],
            borderRadius: spacing[3],
            marginBottom: spacing[2]
        },
        eventContainer: {
            padding: spacing[4]
        },
        timeAndTypeContainer: {
            justifyContent: 'space-between',
            flexDirection: 'row'
        },
        timeText: {
            fontSize: 18,
            color: colors.primary.main
        },
        typeContainer: {
            backgroundColor: 'white',
            borderRadius: spacing[2],
            padding: spacing[2],
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
        },
        typeCircleDot: {
            backgroundColor: colors.primary.main,
            width: 7,
            height: 7,
            marginEnd: spacing[1],
            borderRadius: 50
        }
    });


export default TimelineDetail;