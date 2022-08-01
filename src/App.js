import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { UserContextProvider, ThemeContextProvider, UtilityContextProvider } from './context';
import { StackRoutes } from './routes';

/** App outmost provider/container */
const Provider = () => {
    return (
        <NavigationContainer>
            <ThemeContextProvider>
                <UserContextProvider>
                    <UtilityContextProvider>
                        <App />
                    </UtilityContextProvider>
                </UserContextProvider>
            </ThemeContextProvider>
        </NavigationContainer>
    )
};

/** Main App */
const App = () => {
    return (
        <SafeAreaView style={styles.container}>
            <StackRoutes />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 }
});

export default Provider;
