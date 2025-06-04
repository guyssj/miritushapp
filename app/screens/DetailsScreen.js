import { StyleSheet, View } from "react-native"
import React from "react"
import { Actions } from "../components/DetailsBox";
import api from "../api";
import { minToTime } from "../shared/utilsFuncations";
import dayjs from "dayjs";
import he from 'dayjs/locale/he'
import { Button, Typography } from "../components";
import useStyles from "../theme/useStyles";
import { useTranslation } from "react-i18next";


const DetailsScreen = ({ route, navigation }) => {
    console.log('route', route)
    const { customer, meta, serviceType } = route.params;
    const { colors, styles } = useStyles(createStyles);
    const rescheduleHandle = () => {
        console.log(meta, "RESCHDULE")
    }
    const { t } = useTranslation()
    const handleTransctionError = (error) => {
        navigation.goBack();
    }
    const { isLoading: isTransactionLoading, data: transactionData } = api.calendarQuery.useGetTransactionByBook(meta.id, handleTransctionError)
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
        <View style={styles.sheetContainer}>
            {/* Appointment Details */}
            <Typography variant="h4" style={styles.heading}>{t('detailsScreen.appointmentDetails')}</Typography>
            <View style={styles.detailsContainer}>
                <View style={styles.indicatorContainer}>
                    <Typography>
                        {customer.firstName} {customer.lastName}
                    </Typography>
                    <Typography style={[styles.indicatorValue, { color: meta.arrival == 'Arrival' ? '#2ecc71' : '#e74c3c', }]}>
                        {meta.arrival == 'Arrival' ? t('detailsScreen.arrived') : t('detailsScreen.notArrived')}
                    </Typography>

                </View>
                {/* Date and Time */}
                <View style={styles.dateTimeContainer}>
                    <View style={styles.dateOnlyContainer}>
                        <Typography style={styles.dateTimeLabel}>{t('detailsScreen.date')}:</Typography>
                        <Typography style={styles.dateTimeValue}>
                            יום {dayjs(meta.startDate).locale(he).format('dddd, D MMMM, YYYY')}
                        </Typography>
                    </View>
                    <View style={styles.infoContainer}>
                        <View style={styles.infoItem}>
                            <Typography style={styles.dateTimeLabel}>{t('detailsScreen.time')}:</Typography>
                            <Typography style={styles.dateTimeValue}>{minToTime(meta.startAt)} - {minToTime(meta.startAt + meta.duration)}</Typography>
                        </View>
                        <View style={styles.infoItem}>
                            <Typography style={styles.dateTimeLabel}>{t('detailsScreen.service')}:</Typography>
                            <Typography style={styles.dateTimeValue}>{serviceType.name}</Typography>
                        </View>
                    </View>
                </View>

                {/* Total Price */}
                <View style={styles.totalPriceContainer}>
                    <Typography style={styles.totalPriceLabel}>{t('detailsScreen.totalPrice')}:</Typography>
                    <Typography variant="subtitle" style={styles.totalPriceValue}>$ {serviceType.price}</Typography>
                </View>
            </View>

            {/* Reschedule Button */}
            {/* Pay Button */}
            <View style={[{ flex: 1 }, styles.detailsContainer]}>
                <Button style={[styles.rescheduleButton, { backgroundColor: colors.secondary[500] }]} title={t('reschdule')} onPress={rescheduleHandle}>
                </Button>
                <Button loading={isTransactionLoading} disabled={transactionData?.id ? true : false} style={styles.payButton} title={transactionData?.id ? t('detailsScreen.paid') : t('detailsScreen.finishAndPay')} onPress={POSNav} />
                <Actions book={meta} />
            </View>
        </View>
    )
}

const createStyles = (colors, spacing) =>
    StyleSheet.create({
        sheetContainer: {
            flex: 1,
            backgroundColor: colors.backgroundPrimary, // or '#FAFAFA'
            padding: spacing[4],
        },
        detailsContainer: {
            margin: spacing[0],
            backgroundColor: colors.white,
            borderColor: colors.gray[200],
            borderWidth: 1,
            borderRadius: spacing[4],
            padding: spacing[4],
            shadowColor: colors.black,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.03,
            shadowRadius: spacing[4],
            elevation: 2, // for Android shadow
        },
        heading: {
            marginBottom: spacing[2],
            alignSelf: 'center'
        },
        dateTimeContainer: {
            marginBottom: spacing[4],
        },
        dateTimeItem: {
            flex: 1,
        },
        dateOnlyContainer: {
            marginBottom: spacing[3],
        },

        infoContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: spacing[4],
        },

        infoItem: {
            marginBottom: spacing[2],
        },

        dateTimeLabel: {
            color: colors.gray[500],
            marginBottom: spacing[1],
        },

        dateTimeValue: {
            fontWeight: 'bold',
        },
        totalPriceContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: spacing[2],
        },
        totalPriceLabel: {
            color: colors.gray[500],
        },
        totalPriceValue: {
            fontWeight: 'bold',
            alignSelf: 'center'
        },
        rescheduleButton: {
            padding: spacing[4],
            shadowColor: colors.gray[500]
        },
        indicatorContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: spacing[3],
        },
        indicatorValue: {
            fontWeight: 'bold'
        },
        payButton: {
            shadowColor: colors.gray[500],
            padding: spacing[4],
            alignItems: 'center',
            marginTop: spacing[3],
        },
    });

export default DetailsScreen;