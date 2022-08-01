import React, { useState, useEffect } from 'react';
import { View, Text, useWindowDimensions } from 'react-native';

// https://colorhunt.co/palette/6e85b7b2c8dfc4d7e0f8f9d7
/** WARNING: Designed to use in `UtilityContext`, not as a standalone component */
export const Tooltip = (props = {
    visible: false,
    onClose: () => { },
    message: "",
    coordinate: { // coordinate from onPress event.nativeEvent
        pageX: 0,
        pageY: 0
    }
}) => {
    const { height, width } = useWindowDimensions();

    const pageX = props?.coordinate?.nativeEvent?.pageX || props?.coordinate?.pageX || null;
    const pageY = props?.coordinate?.nativeEvent?.pageY || props?.coordinate?.pageY || null;

    const targetOnLeft = pageX < width / 2;
    const targetOnTop = pageY < height / 2;

    // useffect to handle auto close
    useEffect(() => {
        let timeout;
        if (props.visible) {
            timeout = setTimeout(() => props.onClose(), 2000);
        }
        return () => clearTimeout(timeout);
    }, [props.visible]);

    if (!props.visible || !pageX || !pageY) {
        return null
    }
    return (
        <View
            style={{
                position: 'absolute',
                left: targetOnLeft
                    ? pageX
                    : pageX - (props.message.length * 9) > 0
                        ? pageX - (props.message.length * 9) // calculation from trial and error
                        : 10,
                top: targetOnTop ? pageY : pageY - 40,
                height: 40,
                maxWidth: targetOnLeft ? width - pageX - 10 : pageX - 10,
                borderRadius: 8,
                flexDirection: targetOnLeft ? 'row-reverse' : 'row',
                alignItems: 'center',
                backgroundColor: '#C4D7E0',
                borderWidth: 1,
                borderColor: '#6E85B7',
                paddingHorizontal: 10
            }}
        >
            <Text
                style={{
                    color: 'black',
                    fontFamily: 'raleway.regular',
                    fontSize: 14,
                }}
                numberOfLines={1}
            >{props.message}</Text>
        </View>
    );
};

Tooltip.defaultProps = {
    visible: false,
    onClose: () => { },
    message: "",
    coordinate: {}
};

export default Tooltip;