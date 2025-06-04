import React, { useState } from "react";
import { Alert, SafeAreaView, StyleSheet, View } from "react-native";
import { useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { serviceTypeListSet } from "../../store/reducers/serviceTypes";
import api from "../../api";
import { FutureBooksList } from "../../components/FutureBooks";
import { Typography } from "../../components";
import useStyles from "../../theme/useStyles";
import { useTranslation } from "react-i18next";

const CustomerDetailsScreen = ({ navigation, route }) => {
    const { customerId } = route.params;
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const { serviceTypeList } = useSelector(state => state.serviceType);
    const [futureBooks, setFutureBook] = useState([]);
    const { colors, spacing, styles } = useStyles(createStyles);
    const { isLoading, data } = api.customerQuery.useGetCustomer(customerId);
    const onServiceTypeSuccess = (data) => {
        dispatch(serviceTypeListSet(data))
    }

    const { t } = useTranslation();
    const { data: serivceTypes, isLoading: stLoading } = api.serviceTypesQuery.useGetAllServiceTypes(onServiceTypeSuccess)
    const isServiceTypes = serviceTypeList?.length > 0

    const onFutureBooksSuccess = (futureBooks) => {
        const booksSrvt = futureBooks.map(book => {
            return {
                ...book,
                serviceType: serivceTypes.find(({ id }) => id === book.serviceTypeId)
            }
        })
        setFutureBook(booksSrvt);
    }

    const { isLoading: booksLoad } = api.customerQuery.useGetCustomerFutureBooks(customerId, onFutureBooksSuccess, isServiceTypes);
    const { mutate: cancelBook } = api.calendarQuery.useCancelBook();
    const cancelBookHandle = (item) => {


        cancelBook(item.id, {
            onSuccess: () => {
                queryClient.invalidateQueries(['futureBooks', customerId])
            }
        })
    }

    const alertCancelBook = (item) =>
        Alert.alert(t('alertBeforeCancel.title'), t('alertBeforeCancel.cancelingMessage'), [
            {
                text: t('alertBeforeCancel.yesButton'),
                onPress: () => cancelBookHandle(item),
            },
            {
                text: t('alertBeforeCancel.noButton'),
                onPress: () => console.log('No Pressed', item),
                style: 'cancel',
            }
        ]);

    if (isLoading || booksLoad || stLoading)
        return <View></View>
    return (
        <SafeAreaView style={styles.customerDetailsContainer}>
            <View style={styles.maginSpacing}>
                <Typography variant="h2">{t('customersScreen.customerDetailsTitle')}</Typography>
                <Typography variant="subtitle">{t('customersScreen.customerDetailsModal.subtitleBasic')}</Typography>
            </View>
            <View style={styles.nameAndPhoneContainer}>
                <View style={styles.bottomLine}>
                    <Typography style={styles.label}>{t('customersScreen.customerDetailsModal.labelCustomerName')}</Typography>
                    <Typography variant="h4">{data.firstName} {data.lastName}</Typography>
                </View>
                <View style={styles.bottomLine}>
                    <Typography style={styles.label}>{t('customersScreen.customerDetailsModal.labelPhoneNumber')}</Typography>
                    <Typography variant="h4">{data.phoneNumber}</Typography>
                </View>
                <View style={[styles.bottomLine, { borderBottomWidth: 0, paddingBottom: 0 }]}>
                    <Typography style={styles.label}>{t('customersScreen.customerDetailsModal.labelUpcomingBook')}</Typography>
                    <Typography variant="h4">3</Typography>
                </View>
            </View>
            {!booksLoad && <FutureBooksList onItemPressCancel={alertCancelBook} items={futureBooks} />}
        </SafeAreaView>
    );
}


const createStyles = (colors, spacing) =>
    StyleSheet.create({
        customerDetailsContainer: {
            backgroundColor: colors.backgroundPrimary,
            flex: 1
        },
        bottomLine: {
            borderBottomWidth: 0.2,
            borderColor: colors.gray[300],
            padding: spacing[2]
        },
        maginSpacing: {
            marginStart: spacing[6],
            marginEnd: spacing[6],
            marginTop: spacing[6]
        },
        label: {
            color: colors.gray[500]
        },
        nameAndPhoneContainer: {
            width: 350,
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
            margin: 'auto',
            justifyContent: 'center',
            alignContent: 'center',
            height: 'auto',
            marginBottom: spacing[6],
            marginTop: spacing[6]
        }
    });

export default CustomerDetailsScreen;