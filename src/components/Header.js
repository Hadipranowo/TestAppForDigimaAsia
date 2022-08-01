import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useThemeContext, useUserContext, useUtilityContext } from '../context';

// https://reactnavigation.org/docs/native-stack-navigator#header
/** WARNING: Designed to use in `StackRoutes`, not as a standalone component */
export const Header = (props = {
    navigation: {},
    route: {},
    options: {},
    back: {},
}) => {
    const userContext = useUserContext();
    const theme = useThemeContext();
    const util = useUtilityContext();

    const [title, setTitle] = useState(props?.route?.name || '');

    const onLogout = () => {
        userContext.resetValue();
        props.navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    };

    if (!props?.options?.headerShown) {
        return null;
    }
    return (
        <View style={{
            height: 50,
            width: '100%',
            paddingHorizontal: 20,
            backgroundColor: theme.colors.primary,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
        }}>
            {/* Title */}
            <Text style={[theme.titlePrimary]} numberOfLines={1}
            >{title}</Text>

            {/* Icon */}
            <View style={{ flexDirection: 'row' }}>
                <Ionicons
                    name="contrast"
                    size={theme.titlePrimary.fontSize}
                    color={theme.titlePrimary.color}
                    onPress={theme.toggleDarkMode}
                    onLongPress={(e) => util.showTooltip("Toggle theme", e.nativeEvent)}
                />
                <View style={{ marginRight: 12 }} />
                <MCIcon
                    name='logout'
                    size={theme.titlePrimary.fontSize}
                    color={theme.titlePrimary.color}
                    onPress={onLogout}
                    onLongPress={(e) => util.showTooltip("Logout", e.nativeEvent)}
                />
            </View>

        </View>
    );
};

export default Header;