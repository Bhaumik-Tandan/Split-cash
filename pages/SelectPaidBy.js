import React, { useCallback, useState } from 'react';
import { Text, StyleSheet, SafeAreaView, ScrollView, Pressable, View, TextInput } from 'react-native';
import COLOR from '../constants/Colors';
import { calcHeight, calcWidth, getFontSizeByWindowWidth } from '../helper/res';
import GroupSelectCard from '../components/GroupSelectCard';
import { useTransaction } from '../context/TransactionContext';
import UserAvatar from '../components/UserAvatar';
function GroupListScreen({ navigation }) {
    const { setTransactionData, transactionData } = useTransaction();
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {transactionData.group.members.map((member) => (
                    <GroupSelectCard
                        name={member.name}
                        onPress={() => {
                            setTransactionData((prev) => ({
                                ...prev,
                                paidBy: member,
                            }));
                            navigation.goBack();
                        }}
                        image={<UserAvatar user={member} />}
                    />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.APP_BACKGROUND,
    },
    header: {
        fontSize: getFontSizeByWindowWidth(19),
        color: COLOR.TEXT,
        fontWeight: 'bold',
        padding: calcWidth(3),
        margin: calcHeight(2),
    },
    groupName: {
        fontSize: 16,
        marginVertical: 5, // Add margin for better spacing
    },
    group: {
        flexDirection: 'row',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: calcWidth(5),
        borderWidth: 1,
        borderColor: COLOR.BUTTON,
        borderRadius: 10,
        margin: calcHeight(2),
        marginBottom: calcHeight(5),
    },
    input: {
        flex: 1,
        marginLeft: 10,
        color: 'white',
    },
});

export default GroupListScreen;
