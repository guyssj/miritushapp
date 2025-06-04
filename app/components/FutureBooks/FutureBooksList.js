import { View, VirtualizedList } from 'react-native'
import React from 'react'
import FutureBookItem from './FutureBookItem'
import Typography from '../Typography/Typography';
import { useTranslation } from 'react-i18next';
import useSpacing from '../../theme/useSpacing';

const FutureBooksList = ({ items, onItemPressCancel }) => {
    const { spacing } = useSpacing();
    const { t } = useTranslation();
    return (
        <View style={{ marginStart: spacing[5], marginEnd: spacing[4] }}>
            <Typography variant='h4'>{t('customersScreen.customerDetailsModal.futureBooks')}</Typography>
            <VirtualizedList
                keyExtractor={item => item.id.toString()}
                data={items}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                decelerationRate={'normal'}
                getItemCount={data => data.length | 0}
                getItem={(data, index) => data[index]}
                renderItem={({ item, index }) => <FutureBookItem onItemPressCancel={() => onItemPressCancel(item)} item={item} />}
                ListEmptyComponent={() => <View><Typography>{t('customersScreen.customerDetailsModal.noFutureBooks')}</Typography></View>}
            />
        </View>
    )
}

export default FutureBooksList