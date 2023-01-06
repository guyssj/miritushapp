import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
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
        <View style={{ padding: 10, borderRadius: 20, borderColor: '#E9E9F0', borderWidth: 1.5, width: '96%', height: '30%', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
            <TouchableOpacity disabled={mutation.isLoading} onPress={() => cancelBookHandle()} style={{ alignItems: 'center' }}>
                {!mutation.isLoading && <Trash />}
                {mutation.isLoading && <ActivityIndicator />}
                <Text style={{ fontSize: 20, fontWeight: '400' }}>ביטול</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ alignItems: 'center' }}>
                <ProfileRemove />
                <Text style={{ fontSize: 20, fontWeight: '400' }}>לא מגיע/ה</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => TransactionHandle()} style={{ alignItems: 'center' }}>
                <CardPos />
                <Text style={{ fontSize: 20, fontWeight: '400' }}>רכישות</Text>
            </TouchableOpacity>
        </View>
    )
}
export default Actions;