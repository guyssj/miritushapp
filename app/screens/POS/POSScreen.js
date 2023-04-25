import { ActivityIndicator, Alert, Text, View } from "react-native"
import React, { useEffect, useState } from "react"
import { useTheme } from "../../theme";
import { ItemsList } from "../../components/Items";
import { ProductsList } from "../../components/Products";
import { Button } from "../../components";
import { useMutation, useQuery } from "react-query";
import api from '../../api';
import { useDispatch } from "react-redux";
import { userSignInSet } from "../../store/reducers/user";
import AsyncStorage from '@react-native-async-storage/async-storage';



const POSScreen = ({ route, navigation }) => {
    const { serviceType, customerId, bookId } = route.params;
    const theme = useTheme();
    const [transactionsItems, setTransactionsItems] = useState([])
    const [recipintPay, setRecipintPay] = useState(false)
    const dispatch = useDispatch();
    const mutationSaveItems = useMutation(api.transactions.saveItems, {
        onSuccess: (data) => {
            Alert.alert("Done", "Pay");
            setRecipintPay(true)
        }
    })
    const mutationSave = useMutation(api.transactions.save, {
        onSuccess: (data) => {
            saveItems(data.id)
        }
    })

    const { isLoading, isError, data, error, isFetching } = useQuery("products", () => api.products.getAll(), {
        onError: async (error) => {
            error.status === 401 ? dispatch(userSignInSet(false)) : null;
            await AsyncStorage.removeItem('accessToken')
        }
    })

    useEffect(() => {
        if (transactionsItems.length == 0) {
            setTransactionsItems([...transactionsItems, {
                id: serviceType.id,
                key: `${serviceType.id}_serviceType`,
                name: serviceType.name,
                type: 1,
                quantity: 1,
                subtitle: serviceType.description,
                price: serviceType.price
            }])
        }
    }, [serviceType])

    const handleSaveAll = () => {
        mutationSave.mutate({ customerId, bookId })
    }

    const saveItems = (transactionId) => {
        const saveditems = transactionsItems.map(item => {
            return {
                transactionId: transactionId,
                productId: item.type == 0 ? item.id : null,
                serviceTypeId: item.type == 1 ? item.id : null,
                quantity: item.quantity,
                price: item.price
            }
        })
        mutationSaveItems.mutate(saveditems)
    }
    const handlePressItem = (item) => {
        // console.log(transactionsItems)
        const pos = transactionsItems.map(tItem => tItem.key).indexOf(`${item.id}_product`);
        if (pos > -1) {
            const newObjArr = transactionsItems.map(tItem => {
                if ([`${item.id}_product`].includes(tItem.key)) {
                    const newQuantity = tItem.quantity + 1
                    return { ...tItem, quantity: newQuantity, price: item.price * newQuantity }
                }
                return tItem
            })
            setTransactionsItems(newObjArr);
        }
        else {
            setTransactionsItems([...transactionsItems, {
                key: `${item.id}_product`,
                id: item.id,
                name: item.name,
                type: 0,
                quantity: 1,
                subtitle: item.description,
                price: item.price
            }])
        }
    }

    const onPressDelete = (index) => {
        console.log(transactionsItems)
        console.log("your delete index: " + index)
        const removedTrans = transactionsItems;
        removedTrans.splice(index, 1);
        console.log(removedTrans)
        setTransactionsItems(prev => ([...removedTrans]));
    }

    if (isLoading) {
        return (<View style={{ flex: 1, justifyContent: 'center' }}><ActivityIndicator /></View>)
    }
    if (isError) {
        return (<View style={{ flex: 1, justifyContent: 'center' }}><ActivityIndicator /><Text>Error</Text></View>)
    }


    return (
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#FFFAF6' }}>
            <ItemsList onPressRight={onPressDelete} items={transactionsItems} />
            <View style={{ alignItems: 'center' }}>
                <ProductsList onPress={handlePressItem} items={data} />
                {!recipintPay && <Button loading={mutationSaveItems.isLoading} onPress={handleSaveAll} style={{ width: '90%' }} title={'יצירה חשבונית ' + transactionsItems.reduce((a, b) => a + (b['price'] || 0), 0) + '₪'}></Button>}
                {recipintPay && <Button style={{ width: '90%' }} disabled={true} title={'שולם'} />}
            </View>
        </View>

    )
}

export default POSScreen;