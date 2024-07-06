import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CardPos from "../../svgs/icons/CardPos";
import Trash from "../../svgs/icons/Trash";
import ProfileRemove from "../../svgs/icons/ProfileRem";
import api from "../../api";
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { useNavigation } from "@react-navigation/native";



const Actions = ({ book }) => {
    const queryClient = useQueryClient();
    const navigation = useNavigation();
    const mutation = useMutation(api.calendar.cancelBook, {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries('events')
            navigation.goBack();
        },
    })
    const cancelBookHandle = () => {
        mutation.mutate(book.id)
    }
    const TransactionHandle = () => {
        navigation.navigate("Transactions", book.customerId);
    }

    return (

        <View style={styles.actionButtonsContainer}>
            <TouchableOpacity disabled={mutation.isLoading} onPress={() => cancelBookHandle()} style={styles.actionButton}>
                {!mutation.isLoading && <Trash />}
                {mutation.isLoading && <ActivityIndicator />}
                <Text style={styles.buttonText}>ביטול</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
                <ProfileRemove />
                <Text style={styles.buttonText}>לא מגיע/ה</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => TransactionHandle()} style={styles.actionButton}>
                <CardPos />
                <Text style={styles.buttonText}>רכישות</Text>
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