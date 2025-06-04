import { Button, SafeAreaView, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import LanguageSelector from '../components/LanguageSelector/LanguageSelector'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch } from 'react-redux'
import { userSignInSet } from '../store/reducers/user'

const ProfileScreen = ({ route, navigation }) => {
    const dispatch = useDispatch();
    const logOut = () => {
        dispatch(userSignInSet(false));
        AsyncStorage.removeItem('accessToken');
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <LanguageSelector />

            <View>
                <Button title="התנתק" onPress={() => logOut()} />

            </View>
        </SafeAreaView>
    )
}

export default ProfileScreen