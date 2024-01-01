// 1. Import Statements
import React, { useRef, useState, useCallback } from 'react';
import {
    Text,
    StyleSheet,
    SafeAreaView,
    View,
    Pressable,
    FlatList,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import { Ionicons, AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import apiHelper from '../helper/apiHelper';
import Loader from '../components/Loader';
import PAGES from '../constants/pages';
import FabIcon from '../components/FabIcon';
import { useFocusEffect } from '@react-navigation/native';
import TransactionCard from '../components/TransactionCard';
import LoginIcon from '../assets/Login.png';
import GroupIcon from '../components/GroupIcon';
import COLOR from '../constants/Colors';
import { calcHeight, calcWidth } from '../helper/res';
import { getFontSizeByWindowWidth } from '../helper/res';
import { useTransaction } from '../context/TransactionContext';
import PaymentCard from '../components/PaymentCard';

function getMembersString(members) {
    let names = [];
    for (let i = 0; i < members.length; i++) {
        if (members[i].hasOwnProperty('name') && members[i].name) {
            let namePart = members[i].name.split(' ')[0];
            names.push(namePart);
        }
    }
    return names.join(', ');
}

function GroupScreen({
    navigation,
    route: {
        params: { group },
    },
}) {
    const textRef = useRef();
    const [activities, setActivities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { setTransactionData, resetTransaction } = useTransaction();
    const [amount, setAmount] = useState('');

    const fetchActivities = useCallback(async () => {
        setIsLoading(true);
        try {
            const { data } = await apiHelper(`/activity-feed/${group._id}`);
            setActivities(data);
        } catch (error) {
            console.error('Error fetching activities:', error);
        }
        setIsLoading(false);
    }, [group]);

    useFocusEffect(fetchActivities);

    const renderActivity = ({ item }) => {
        if (item.activityType === 'transaction') {
            return <TransactionCard transaction={item.relatedId} />;
        } else if(item.activityType === 'payment') {
            return <PaymentCard creator={item.creator} createdAt={item.createdAt}
            payer={item.relatedId.payer} receiver={item.relatedId.receiver}
            amount={item.relatedId.amount}
            />
        }
    };

    if (isLoading) {
        return <Loader />;
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View
                    style={{
                        width: '40%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Pressable onPress={() => navigation.goBack()}>
                        <Ionicons
                            name="chevron-back"
                            size={calcHeight(3)}
                            color="#87CEEB"
                        />
                    </Pressable>
                    <GroupIcon image={LoginIcon} />
                    <View style={styles.groupNameContainer}>
                        <Text style={styles.groupName}>{group.name}</Text>
                        <Text style={styles.groupMembers}>
                            {getMembersString(group.members)}
                        </Text>
                    </View>
                </View>
                <AntDesign
                    name="scan1"
                    size={24}
                    color="white"
                    style={{
                        marginRight: calcWidth(5),
                    }}
                />
            </View>
            <FlatList
                inverted
                data={activities}
                keyExtractor={(item) => item._id}
                renderItem={renderActivity}
                style={{
                    height: calcHeight(75),
                }}
            />
            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    margin: calcWidth(2),
                    justifyContent: 'space-evenly',
                }}
            >
                <Pressable
                    style={styles.inputContainer}
                    onPress={() => textRef.current.focus()}
                >
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#ccc"
                        ref={textRef}
                        placeholder="Enter the amount"
                        textAlign="center"
                        value={amount}
                        onChangeText={setAmount}
                    />
                </Pressable>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        resetTransaction();
                        setTransactionData((prev) => ({
                            ...prev,
                            group,
                            amount,
                        }));
                        navigation.navigate(PAGES.ADD_TRANSACTION);
                    }}
                >
                    <Text style={styles.buttonText}>+ Expense</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.APP_BACKGROUND,
    },
    header: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    groupNameContainer: {
        // marginLeft: calcWidth(5),
    },
    groupName: {
        color: 'white',
        fontWeight: 'bold',
    },
    groupMembers: {
        color: '#A5A5A5',
    },
    button: {
        width: calcWidth(25),
        height: calcHeight(5),
        borderRadius: 10,
        backgroundColor: COLOR.BUTTON,
        elevation: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: getFontSizeByWindowWidth(12),
        color: 'white',
        alignItems: 'center',
    },
    inputContainer: {
        color: 'white',
        width: calcWidth(60),
        height: calcHeight(5),
        alignContent: 'center',
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        color: 'white',
        fontSize: getFontSizeByWindowWidth(10),
    },
});

// 9. Export Statement
export default GroupScreen;
