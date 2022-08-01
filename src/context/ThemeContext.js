import React, { useState, createContext, useContext } from 'react';
import { useColorScheme, StyleSheet } from 'react-native';

// https://colorhunt.co/palette/2c3333395b64a5c9cae7f6f2
// https://inkbotdesign.com/font-combinations/
const getTheme = (type = 'dark') => {
    // base theme
    const darkColors = {
        primary: '#395B64', // dark
        secondary: '#A5C9CA', // light
        background: '#2C3333', // dark
        textPrimary: '#F5F5F5', // light
        textSecondary: '#112A46', // dark
        textBackground: '#F5F5F5', // light
        error: '#B30000',
    };

    const lightColors = {
        primary: '#395B64', // dark
        secondary: '#A5C9CA', // light
        background: '#E7F6F2', // light
        textPrimary: '#F5F5F5', // light
        textSecondary: '#112A46', // dark
        textBackground: '#112A46', // dark
        error: '#B30000',
    };

    // final theme
    const colors = type === 'dark' ? darkColors : lightColors;

    const fontStyles = StyleSheet.create({
        title: {
            fontFamily: 'raleway.regular',
            fontSize: 18,
            color: colors.textBackground,
            fontWeight: '600'
        },
        titlePrimary: {
            fontFamily: 'raleway.regular',
            fontSize: 18,
            color: colors.textPrimary,
            fontWeight: '600'
        },
        titleSecondary: {
            fontFamily: 'raleway.regular',
            fontSize: 18,
            color: colors.textSecondary,
            fontWeight: '600'
        },
        body: {
            fontFamily: 'lusitana.regular',
            fontSize: 14,
            color: colors.textBackground,
            fontWeight: '400'
        },
        bodyPrimary: {
            fontFamily: 'lusitana.regular',
            fontSize: 14,
            color: colors.textPrimary,
            fontWeight: '400',
        },
        bodySecondary: {
            fontFamily: 'lusitana.regular',
            fontSize: 14,
            color: colors.textSecondary,
            fontWeight: '400',
        },
    });

    const shapeStyles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
            // padding: 20
        },
        input: {
            width: '100%',
            marginVertical: 5,
            backgroundColor: colors.secondary,
            borderRadius: 6,
            ...fontStyles.bodySecondary
        },
        button: {
            width: '100%',
            marginVertical: 5,
            backgroundColor: colors.primary,
            borderRadius: 6,
            textAlign: 'center',
            padding: 10,
            ...fontStyles.titlePrimary
        }
    })

    const theme = {
        colors: colors,
        ...fontStyles,
        ...shapeStyles
    };

    return theme;
};

const ThemeContext = createContext({
    ...getTheme('light'),
    toggleDarkMode: () => {}
});

/** Context consumer to get theme */
export const useThemeContext = () => {
    return useContext(ThemeContext);
};

/** Context provider that handle theme */
export const ThemeContextProvider = (props) => {
    const [isDarkMode, setIsDarkMode] = useState(useColorScheme() === 'dark');

    return (
        <ThemeContext.Provider value={{
            ...getTheme(isDarkMode ? 'dark' : 'light'),
            toggleDarkMode: () => setIsDarkMode(prev => !prev)
        }}>
            {props.children}
        </ThemeContext.Provider>
    )
};

export default {
    ThemeContextProvider,
    useThemeContext
};