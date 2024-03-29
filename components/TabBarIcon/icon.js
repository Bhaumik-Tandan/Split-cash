import React from 'react';
import { EvilIcons } from '@expo/vector-icons';
import PAGES from '../../constants/pages';
import COLOR from '../../constants/Colors';
import { Octicons, Foundation } from '@expo/vector-icons';
const color = COLOR.BUTTON; // Example color, replace with actual color needed.
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Expense from '../../assets/icons/expense.png';
import SelectedExpense from '../../assets/icons/selectedExpense.png';
import { Image } from 'react-native';
import { calcHeight } from '../../helper/res';
const size = calcHeight(3);
export default ({ focused, screen }) => {
    const icons = {
        [PAGES.BALANCE]: focused ? (
            <Foundation name="home" size={size} color={color} />
        ) : (
            <Octicons name="home" size={size} color={color} />
        ),
        [PAGES.GROUP_LIST]: focused ? (
            <MaterialCommunityIcons name="account-group" size={size} color={color} />
        ) : (
            <MaterialCommunityIcons name="account-group-outline" size={size} color={color} />
        ),

        [PAGES.EXPENSE]: focused ? (
            <Image
                style={{
                    width: size,
                    height: size,
                }}
                source={SelectedExpense}
            />
        ) : (
            <Image
                style={{
                    width: size,
                    height: size,
                }}
                source={Expense}
            />
        ),
    };

    return icons[screen] || null;
};
