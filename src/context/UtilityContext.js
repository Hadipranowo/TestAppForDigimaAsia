import React, { useState, createContext, useContext } from 'react';
import { SafeAreaView } from 'react-native';

import { Snackbar, Tooltip } from '../components';

const UtilityContext = createContext({
    /** Show snackbar (only error styling for now)
     * @example showSnackbar("snackbar message")
     */
    showSnackbar: (message = "") => { },
    /** Show tooltip, need coordinate from nativeEvent.
     * @example <Button onLongPress={(event) => showTooltip("tooltip message", event.nativeEvent)} />
     */
    showTooltip: (message = "", nativeEvent = { pageX: 0, pageY: 0 }) => { }
});

/** Context consumer to use utility like snackbar */
export const useUtilityContext = () => {
    return useContext(UtilityContext);
};

/** Context provider that handle utility action */
export const UtilityContextProvider = (props) => {
    // HANDLE SNACKBAR
    const [snackbarData, setSnackbarData] = useState({
        visible: false,
        message: "",
    });

    const showSnackbar = (message = "") => {
        setSnackbarData({
            visible: true,
            message: message
        });
    };

    const closeSnackbar = () => {
        setSnackbarData({
            visible: false,
            message: ''
        });
    };

    // HANDLE TOOLTIP
    const [tooltipData, setTooltipData] = useState({
        visible: false,
        message: "",
        coordinate: {}
    });

    const showTooltip = (message = "", nativeEvent = {}) => {
        setTooltipData({
            visible: true,
            message: message,
            coordinate: nativeEvent
        });
    };

    const closeTooltip = () => {
        setTooltipData({
            visible: false,
            message: '',
            coordinate: {}
        });
    };

    // RETURN JSX
    return (
        <UtilityContext.Provider value={{
            showSnackbar: showSnackbar,
            showTooltip: showTooltip,
        }}>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
                {props.children}
                <Snackbar
                    visible={snackbarData.visible}
                    message={snackbarData.message}
                    onClose={closeSnackbar}
                />
                <Tooltip
                    visible={tooltipData.visible}
                    message={tooltipData.message}
                    coordinate={tooltipData.coordinate}
                    onClose={closeTooltip}
                />
            </SafeAreaView>
        </UtilityContext.Provider>
    );
};

export default {
    UtilityContextProvider,
    useUtilityContext
}