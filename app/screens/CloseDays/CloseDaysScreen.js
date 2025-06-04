import { View, SafeAreaView, ActivityIndicator } from 'react-native'
import React from 'react'
import { useQueryClient } from 'react-query';
import api from '../../api';
import { CloseDayList } from '../../components/CloseDaysList';
import useColors from '../../theme/useColors';
import { useTranslation } from 'react-i18next';

const CloseDaysScreen = ({ navigation, route }) => {
    const { colors } = useColors();
    const queryClient = useQueryClient();

    const { isLoading: closeDaysLoading, data: closeDays } = api.calendarQuery.useGetAllCloseDays();
    const { mutate: deleteCloseDay } = api.calendarQuery.useDeleteCloseDay();
    const { t } = useTranslation();
    const handleDeleteCloseDay = (item) => {
        deleteCloseDay(item.id, {
            onSuccess: () => {
                queryClient.invalidateQueries('close-days');
            }
        })
    }
    if (closeDaysLoading)
        return (<View style={{ flex: 1, justifyContent: 'center' }}><ActivityIndicator /></View>)


    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: colors.backgroundPrimary, }} >
            <CloseDayList onPressRight={handleDeleteCloseDay} items={closeDays} />
        </SafeAreaView>
    )
}

export default CloseDaysScreen;