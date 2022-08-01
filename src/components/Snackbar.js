import React, { useState, useEffect } from 'react';
import { View, Text, useWindowDimensions } from 'react-native';

/** WARNING: Designed to use in `UtilityContext`, not as a standalone component */
export const Snackbar = (props = {
    visible: false,
    onClose: () => { },
    message: ""
}) => {
    const { width } = useWindowDimensions();

    // useffect to handle auto close
    useEffect(() => {
        let timeout;
        if (props.visible) {
            timeout = setTimeout(() => props.onClose(), 6000);
        }
        return () => clearTimeout(timeout);
    }, [props.visible]);

    if (!props.visible) {
        return null
    }
    return (
        <View
            style={{
                position: 'absolute',
                bottom: 20,
                left: 0.05 * width,
                height: 60,
                width: 0.9 * width,
                borderRadius: 8,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#B30000',
                paddingLeft: 10
            }}
        >
            {/* Message */}
            <Text
                style={{
                    color: 'white',
                    fontFamily: 'raleway.regular',
                    fontSize: 14
                }}
                numberOfLines={1}
            >{props.message}</Text>

            {/* Close button */}
            <Text
                style={{ padding: 15, borderRadius: 100 }}
                onPress={props.onClose}
            >X</Text>
        </View>
    );
};

Snackbar.defaultProps = {
    visible: false,
    onClose: () => { },
    message: "",
};

export default Snackbar;