import { NavigationContainer } from '@react-navigation/native';

import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';
import Loader from '../components/Loader';
import { useAuth } from '../context/AuthContext';
import linking from '../helper/linking';
function RootNavigator() {
    const { user, loading } = useAuth();

    return loading ? (
        <Loader />
    ) : (
        <NavigationContainer linking={linking}>
            {user ? <AppNavigator /> : AuthNavigator}
        </NavigationContainer>
    );
}

export default RootNavigator;
