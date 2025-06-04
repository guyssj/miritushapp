import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { format } from 'date-fns'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { minToTime } from '../../shared/utilsFuncations';
import Button from '../Button';
import useStyles from '../../theme/useStyles';
import Typography from '../Typography/Typography';
import { useTranslation } from 'react-i18next';
import { dateFnsLocales } from '../../i18n/dateLocale';

const FutureBookItem = ({ onItemPressCancel, onItemPressReschdule, item }) => {
    const { colors, styles } = useStyles(createStyles);
    const { i18n, t } = useTranslation();
    const currentLang = i18n.language || 'en';
    return (
        <View style={[styles.cardContainer]}>
            <View style={styles.cardHeaderContainer}>
                <View style={[styles.cardHeader]}>
                    <Typography style={styles.label}>{t('detailsScreen.date')}</Typography>
                    <Typography style={{ fontWeight: 'bold' }} variant='body'>
                        {format(new Date(item.startDate), "dd MMMM yyyy", { locale: dateFnsLocales[currentLang] })}
                    </Typography>
                </View>
                <View>
                    <Typography style={[{ color: item.arrival == 'Arrival' ? colors.success[600] : colors.error[600] }]}>
                        <Icons name={item.arrival == 'Arrival' ? 'check-circle' : 'close-circle'} color={item.arrival == 'Arrival' ? colors.success[600] : colors.error[600]} size={20} />
                        {item.arrival == 'Arrival' ? t('detailsScreen.arrived') : t('detailsScreen.notArrived')}
                    </Typography>
                    <Typography>
                        {item.arrival == 'Unknown' ? t('customersScreen.customerDetailsModal.labelAwatingto') : null}
                    </Typography>
                </View>
            </View>
            <View style={styles.cardBody}>
                <Typography variant='h3'> {item.serviceType.name} </Typography>
                <Typography variant='subtitle'>
                    {minToTime(item.startAt)} - {minToTime(item.startAt + item.duration)}
                </Typography>
            </View>
            <View style={styles.cardButtons}>
                <Button title={t('reschdule')} style={styles.buttonsStyle} />
                <Button title={t('detailsScreen.actionsButtons.cancelBook')} onPress={onItemPressCancel} style={styles.buttonsStyle} />
            </View>
        </View>
    )
}

const createStyles = (colors, spacing) =>
    StyleSheet.create({
        cardHeaderContainer: {
            justifyContent: 'space-between',
            flexDirection: 'row',
        },
        cardContainer: {
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
            height: 'auto',
            width: 350,
            marginBottom: spacing[6],
            marginTop: spacing[6]
        },
        cardHeader: {

        },
        label: {
            color: colors.gray[500]
        },
        cardBody: {
            padding: spacing[2],
            alignItems: 'center'
        },
        cardButtons: {
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: spacing[2]
        },
        buttonsStyle: {
            borderColor: colors.white,
            borderWidth: 1,
            paddingVertical: spacing[2],
            padding: spacing[4],
            margin: spacing[1]
        }

    });

export default FutureBookItem