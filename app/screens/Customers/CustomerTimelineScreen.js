import { View, Text } from 'react-native'
import React from 'react'
import { format } from 'date-fns'
import { color, useTheme } from "../../theme";
import { TimelineDetail } from '../../components';
import Timeline from 'react-native-timeline-flatlist';
import { useQuery, useQueryClient } from 'react-query';
import api from '../../api';
import { useDispatch } from 'react-redux';



const CustomerTimelineScreen = ({ navigation, route }) => {
    const theme = useTheme();
    const { customerId } = route.params.params;
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const { isLoading: booksLoad, isError: booksIsError, data, error: booksError } = useQuery(['timeline', customerId], () => api.customers.getTimeline(customerId), {
        onError: async (error) => {
            error.status === 401 ? disp(userSignInSet(false)) : null;
            await AsyncStorage.removeItem('accessToken')
        }
    })

    return (
        <View style={{
            flex: 1,
            padding: 20,
            backgroundColor: 'white'
        }}>
            <Timeline
                style={{
                    list: {
                        flex: 1,
                        marginTop: 20,
                    },
                }}
                data={data}
                showTime={false}
                isUsingFlatlist={true}
                circleSize={20}
                renderDetail={(rowData, sectionID, rowID) =>
                    <TimelineDetail rowData={rowData} sectionID={sectionID} rowID={rowID}
                    />}
                lineColor={theme.palette.secondary[400]}
                circleColor={theme.palette.secondary[400]}

            />
        </View>
    )
}

export default CustomerTimelineScreen;