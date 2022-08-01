import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text } from 'react-native';

// import { Login, Journey } from '../views';
import { useThemeContext } from '../context';
import { Header } from '../components';

const Stack = createNativeStackNavigator();

export const StackRoutes = () => {
    return <View><Text>BASE PROJECT</Text></View>;

    // const theme = useThemeContext();

    // const routes = [
    //     { name: 'Login', component: Login, options: { headerShown: false } },
    //     { name: 'Journey', component: Journey },
    // ];

    // return (
    //     <Stack.Navigator
    //         initialRouteName='Login'
    //         screenOptions={{
    //             contentStyle: { backgroundColor: theme.colors.background, flex: 1 },
    //             header: (navProps) => <Header {...navProps} />,
    //             headerShown: true
    //         }}
    //     >
    //         {routes.map((item, index) => (
    //             <Stack.Screen
    //                 key={index}
    //                 name={item.name}
    //                 component={item.component}
    //                 options={item.options}
    //             />
    //         ))}
    //     </Stack.Navigator>
    // );
};

export default StackRoutes;