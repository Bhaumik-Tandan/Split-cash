import React, { useState } from 'react';
import { TouchableOpacity, Text, View, Modal, Pressable } from 'react-native';
import { DatePickerModal } from 'react-native-paper-dates';
import { getFontSizeByWindowWidth } from '../helper/res';
import COLOR from '../constants/Colors';
import { calcHeight } from '../helper/res';
import { useExpense } from '../stores/expense';

const getStartOfWeek = () => {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setHours(0, 0, 0, 0);
    startOfWeek.setDate(now.getDate() - now.getDay());
    return startOfWeek;
};

const getStartOfMonth = () => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    startOfMonth.setHours(0, 0, 0, 0);
    return startOfMonth;
};

const DatePickerSelector = () => {
    const { range, setRange, loading, fetchExpense } = useExpense();
    const [modalState, setModalState] = useState(null);
    if (loading)
        return (
            <View style={styles.buttonContainer}>
                <Text style={[styles.buttonText, { opacity: 0 }]}>Date</Text>
            </View>
        );

    const onDismiss = () => {
        setModalState(null);
    };

    const onConfirm = ({ startDate, endDate }) => {
        setModalState(null);
        setRange({ startDate, endDate });
        fetchExpense();
    };

    const showCustomDateModal = () => {
        setModalState('datePicker');
    };

    const renderButtons = () => (
        <>
            <TouchableOpacity style={styles.buttonContainer} onPress={() => setModalState('model')}>
                <Text style={styles.buttonText}>Date</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalState === 'model'}
                onRequestClose={() => {
                    setModalState(null);
                }}
            >
                <Pressable style={styles.modalContent} onPress={() => setModalState(null)}>
                    <View style={styles.modalView}>
                        <TouchableOpacity
                            onPress={() => {
                                onConfirm({
                                    startDate: undefined,
                                    endDate: undefined,
                                });
                            }}
                            style={styles.dateTypeContainer}
                        >
                            <Text style={styles.dateTypeText}>All Transactions</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                onConfirm({
                                    startDate: getStartOfWeek(),
                                    endDate: new Date(),
                                });
                            }}
                            style={styles.dateTypeContainer}
                        >
                            <Text style={styles.dateTypeText}>This Week</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                onConfirm({
                                    startDate: getStartOfMonth(),
                                    endDate: new Date(),
                                });
                            }}
                            style={styles.dateTypeContainer}
                        >
                            <Text style={styles.dateTypeText}>This Month</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={showCustomDateModal} style={styles.dateTypeContainer}>
                            <Text style={styles.dateTypeText}>Custom Date</Text>
                        </TouchableOpacity>
                    </View>
                </Pressable>
            </Modal>

            <DatePickerModal
                locale="en"
                mode="range"
                visible={modalState === 'datePicker'}
                onDismiss={onDismiss}
                startDate={range.startDate}
                endDate={range.endDate}
                onConfirm={onConfirm}
            />
        </>
    );

    return <View>{renderButtons()}</View>;
};

export default DatePickerSelector;

const styles = {
    buttonContainer: {
        backgroundColor: '#342F4F',
        padding: 10,
        flexDirection: 'row',
        borderRadius: 5,
    },
    buttonText: {
        fontSize: getFontSizeByWindowWidth(10),
        color: COLOR.TEXT,
    },
    modalContent: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: calcHeight(4),
        backgroundColor: 'white',
        paddingBottom: calcHeight(7),
        backgroundColor: COLOR.APP_BACKGROUND,
    },
    dateTypeText: {
        fontSize: getFontSizeByWindowWidth(15),
        color: COLOR.TEXT,
    },
    dateTypeContainer: {
        justifyContent: 'center',
        alignItems: 'center', // Corrected from alignItem
        alignContent: 'center', // Corrected from alignItem,
        margin: calcHeight(2),
    },
};
