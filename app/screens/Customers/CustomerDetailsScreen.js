import React, { useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { userSignInSet } from "../../store/reducers/user";
import { serviceTypeListSet } from "../../store/reducers/serviceTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../api";
import { color, spacing, useTheme } from "../../theme";
import { Avatar } from "@rneui/base";
import { FutureBooksList } from "../../components/FutureBooks";

const CustomerDetailsScreen = ({ navigation, route }) => {
    console.log(route.params)
    const { customerId } = route.params;
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const { serviceTypeList } = useSelector(state => state.serviceType);
    const [futureBooks, setFutureBook] = useState([]);
    const theme = useTheme();
    const { isLoading, isError, data, error, isFetching } = useQuery(['customer', customerId], () => api.customers.get(customerId), {
        onError: async (error) => {
            error.status === 401 ? dispatch(userSignInSet(false)) : null;
            await AsyncStorage.removeItem('accessToken')
        }
    })
    const { data: serivceTypes, isLoading: stLoading } = useQuery(['serviceTypes'], () => api.serviceTypes.getAll(), {
        onError: async (error) => {
            error.status === 401 ? dispatch(userSignInSet(false)) : null;
            await AsyncStorage.removeItem('accessToken')
        },
        onSuccess: async (data) => {
            dispatch(serviceTypeListSet(data))
        },
        enabled: serviceTypeList?.length == 0
    })
    const isServiceTypes = serviceTypeList?.length > 0
    const { isLoading: booksLoad, isError: booksIsError, futureBookData, error: booksError } = useQuery(['futureBooks', customerId], () => api.customers.getFutureBooks(customerId), {
        onError: async (error) => {
            error.status === 401 ? dispatch(userSignInSet(false)) : null;
            await AsyncStorage.removeItem('accessToken')
        },
        onSuccess: async (data) => {
            const booksSrvt = data.map(book => {
                return {
                    ...book,
                    serviceType: serivceTypes.find(({ id }) => id === book.serviceTypeId)
                }

            })
            setFutureBook(booksSrvt);
        },
        enabled: isServiceTypes
    })

    const mutation = useMutation(api.calendar.cancelBook, {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries(['futureBooks', customerId])
        },
    })

    const cancelBookHandle = (item) => {
        mutation.mutate(item.id)
    }

    if (isLoading || booksLoad || stLoading)
        return <View></View>
    return (
        <SafeAreaView style={{ backgroundColor: color.palette.offWhiteBack, flex: 1 }}>
            <View style={{ alignItems: 'center', flex: 1 }}>
                <View style={{ alignItems: 'center', marginBottom: spacing[6], marginTop: spacing[6] }}>
                    <Avatar size={82}
                        rounded
                        containerStyle={{ backgroundColor: theme.palette.primary.main }}
                        icon={{ name: 'account-circle', type: "material", size: 80 }} />

                    <Text style={{ fontSize: 30, fontWeight: '300' }}>{data.firstName} {data.lastName}</Text>
                    <Text style={{ fontSize: 18, fontWeight: '200' }}>{data.phoneNumber}</Text>
                </View>
                <View>
                    {!booksLoad && <FutureBooksList onItemPressCancel={cancelBookHandle} items={futureBooks} />}
                </View>
            </View>
        </SafeAreaView>
    );
}

export default CustomerDetailsScreen;