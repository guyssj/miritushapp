import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CardPos from "../../svgs/icons/CardPos";
import Trash from "../../svgs/icons/Trash";
import ProfileRemove from "../../svgs/icons/ProfileRem";
import api from "../../api";
import { useQueryClient } from 'react-query'
import { useNavigation } from "@react-navigation/native";
import Typography from "../Typography/Typography";
import { useTranslation } from "react-i18next";



const Actions = ({ book }) => {
    const queryClient = useQueryClient();
    const navigation = useNavigation();
    const { mutate: cancelBook, isLoading: cancelBookLoading } = api.calendarQuery.useCancelBook();
    const { t } = useTranslation();
    const cancelBookHandle = () => {
        cancelBook(book.id, {
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries('events')
                navigation.goBack();
            }
        })
    }
    const TransactionHandle = () => {
        navigation.navigate("Transactions", book.customerId, { pop: true });
    }

    return (

        <View style={styles.actionButtonsContainer}>
            <TouchableOpacity disabled={cancelBookLoading} onPress={() => cancelBookHandle()} style={styles.actionButton}>
                {!cancelBookLoading && <Trash />}
                {cancelBookLoading && <ActivityIndicator />}
                <Typography style={styles.buttonText}>{t('detailsScreen.actionsButtons.cancelBook')}</Typography>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
                <ProfileRemove />
                <Typography style={styles.buttonText}>{t('detailsScreen.actionsButtons.selectNoShow')}</Typography>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => TransactionHandle()} style={styles.actionButton}>
                <CardPos />
                <Typography style={styles.buttonText}>{t('detailsScreen.actionsButtons.purchases')}</Typography>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    actionButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 'auto',
    },
    actionButton: {
        alignItems: 'center',
    },
    buttonText: {
        color: '#555',
        marginTop: 5,
    }
})

export default Actions;