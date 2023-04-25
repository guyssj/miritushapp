import { View, Text, SafeAreaView, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';
import api from '../../api';
import { userSignInSet } from '../../store/reducers/user';
import { CloseDayList } from '../../components/CloseDaysList';
import { color, useTheme } from '../../theme';

const CloseDaysScreen = ({ navigation, route }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const { isLoading, isError, data, error, isFetching } = useQuery("closeDays", () => api.calendar.getAllCloseDays(), {
        onError: async (error3) => {
            error3.status === 401 ? dispatch(userSignInSet(false)) : null;
            await AsyncStorage.removeItem('accessToken')
        }
    })

    const mutation = useMutation(api.calendar.deleteCloseDay, {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries('closeDays')
        }
    })


    const handleDeleteCloseDay = (item) => {
        mutation.mutate(item.id)
    }
    if (isLoading) {
        return (<View style={{ flex: 1, justifyContent: 'center' }}><ActivityIndicator /></View>)
    }


    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: color.palette.offWhiteBack, }} >
            <CloseDayList onPressRight={handleDeleteCloseDay} items={data} />
        </SafeAreaView>
    )
}

export default CloseDaysScreen;