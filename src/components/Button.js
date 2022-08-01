import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { useThemeContext } from '../context';

/** Standalone component */
export const Button = (props = {
    style: {},
    fontStyle: {},
    onPress: () => { },
    disabled: false,
    children: ""
}) => {
    const theme = useThemeContext();

    return (
        <TouchableOpacity
            style={[theme.button, props.style, { opacity: props.disabled ? 0.5 : 1 }]}
            activeOpacity={0.7}
            onPress={props.onPress}
            disabled={props.disabled}
        >
            <Text style={[theme.titlePrimary, { textAlign: 'center' }, props.fontStyle]}
            >{props.children}</Text>
        </TouchableOpacity>
    );
};

export default Button;