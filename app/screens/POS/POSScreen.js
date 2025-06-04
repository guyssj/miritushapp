import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native"
import React, { useEffect, useState } from "react"
import { ItemsList } from "../../components/Items";
import { ProductsList } from "../../components/Products";
import { Button } from "../../components";
import api from '../../api';
import useStyles from "../../theme/useStyles";
import { t } from "i18next";


const POSScreen = ({ route, navigation }) => {
    const { serviceType, customerId, bookId } = route.params;
    const [transactionsItems, setTransactionsItems] = useState([]);
    const [recipintPay, setRecipintPay] = useState(false);
    const { mutate: mutationSaveItems, isLoading: saveItemsLoading } = api.transactionsQuery.useSaveTransactionItems();
    const { mutate: saveTransaction } = api.transactionsQuery.useSaveTransaction();
    const { isLoading: productsLoader, isError: productsError, data: products } = api.productsQuery.useGetProducts();

    const { colors, styles } = useStyles(createStyles);

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
        saveTransaction({ customerId, bookId }, {
            onSuccess: (data) => {
                saveItems(data.id)
            }
        })
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
        mutationSaveItems(saveditems, {
            onSuccess: () => {
                Alert.alert("Done", "Pay");
                setRecipintPay(true)
            }
        })
    }
    const handlePressItem = (item) => {
        const key = `${item.id}_product`;
        const index = transactionsItems.findIndex(tItem => tItem.key === key);

        if (index !== -1) {
            const updatedItems = [...transactionsItems];
            const existingItem = updatedItems[index];
            const newQuantity = existingItem.quantity + 1;

            updatedItems[index] = {
                ...existingItem,
                quantity: newQuantity,
                price: item.price * newQuantity
            };

            setTransactionsItems(updatedItems);
            return;
        }

        const newItem = {
            key,
            id: item.id,
            name: item.name,
            type: 0,
            quantity: 1,
            subtitle: item.description,
            price: item.price
        };

        setTransactionsItems([...transactionsItems, newItem]);
    };

    const onPressDelete = (index) => {
        setTransactionsItems(prev => prev.filter((_, i) => i !== index));
    };

    if (productsLoader)
        return <View style={styles.posContainer}><ActivityIndicator /></View>

    if (productsError)
        return <View style={styles.posContainer}><ActivityIndicator /><Text>Error</Text></View>



    return (
        <View style={styles.posContainer}>
            <ItemsList onPressRight={onPressDelete} items={transactionsItems} />
            <View style={{ alignItems: 'center' }}>
                <ProductsList onPress={handlePressItem} items={products} />
                <View style={{ width: '100%', padding: 15 }}>
                    <Button
                        disabled={recipintPay}
                        style={styles.payButton}
                        loading={saveItemsLoading}
                        onPress={handleSaveAll}
                        title={
                            recipintPay
                                ? t('detailsScreen.paid')
                                : t('confirmPayment', { amount: transactionsItems.reduce((total, item) => total + (item.price || 0), 0) })
                        }
                    />
                </View>
            </View>
        </View>

    )
}

const createStyles = (colors, spacing) =>
    StyleSheet.create({
        payButton: {
            shadowColor: 'rgba(0, 0, 0, 0.55)',
            padding: spacing[4],
            borderRadius: spacing[2],
            alignItems: 'center'
        },
        posContainer: {
            flex: 1,
            justifyContent: 'center'
        }
    });

export default POSScreen;