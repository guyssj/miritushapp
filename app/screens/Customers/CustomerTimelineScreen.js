import { View } from 'react-native'
import React from 'react'
import { TimelineDetail } from '../../components';
import Timeline from 'react-native-timeline-flatlist';
import api from '../../api';
import useColors from '../../theme/useColors';
import useSpacing from '../../theme/useSpacing';

const CustomerTimelineScreen = ({ navigation, route }) => {
    const { colors } = useColors();
    const { spacing } = useSpacing();
    const { customerId } = route.params.params;
    const { isLoading: booksLoad, data } = api.customerQuery.useGetCustomerTimeline(customerId);

    return (
        <View style={{
            flex: 1,
            padding: spacing[3],
            backgroundColor: colors.white
        }}>
            <Timeline
                style={{
                    list: {
                        flex: 1,
                    },
                }}
                data={data}
                showTime={false}
                isUsingFlatlist={true}
                circleSize={20}
                renderDetail={(rowData, sectionID, rowID) =>
                    <TimelineDetail rowData={rowData} sectionID={sectionID} rowID={rowID}
                    />}
                lineColor={colors.secondary[400]}
                circleColor={colors.secondary[400]}

            />
        </View>
    )
}

export default CustomerTimelineScreen;