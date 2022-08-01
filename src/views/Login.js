import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    ActivityIndicator,
    Keyboard
} from 'react-native';

import { Http } from '../http';
import { Button } from '../components';
import { useUserContext, useThemeContext, useUtilityContext } from '../context';

export const Login = (props) => {
    const navigation = props.navigation;
    const userContext = useUserContext();
    const theme = useThemeContext();
    const util = useUtilityContext();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const onLogin = () => {
        const formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);
        formData.append("firebase_token", "78342rhksfjdfsdfsdfds");
        formData.append("brand", "Xiaomi");
        formData.append("model", "MiA1");
        formData.append("serial_number", "786423749234");
        formData.append("platform", "Android");
        formData.append("version", "7.0");

        setLoading(true);

        Http({
            method: 'post',
            url: '/login',
            data: formData,
            headers: {
                'Content-Type': "multipart/form-data"
            }
        })
            .then((res) => {
                const _status = res.data?.status || res.status;
                const _data = res.data?.data || {};
                if (_status === 200) {
                    userContext.setValue({
                        ..._data,
                        ..._data.user
                    });

                    Keyboard.dismiss();
                    navigation.navigate('Journey');
                } else {
                    throw { response: res }
                }
            })
            .catch((err) => {
                console.log('Error in onLogin', err.response.status, err.response.data);
                util.showSnackbar(err.response.data?.message || "Something when wrong");
            })
            .finally(() => {
                setLoading(false);
            })
    };

    useEffect(() => {
        setUsername("");
        setPassword("");
    }, []);

    const styles = StyleSheet.create({
        container: { backgroundColor: theme.colors.primary, flex: 1 },
        head: { height: 200, width: '100%', alignItems: 'center', justifyContent: 'center' },
        topCurve: { padding: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20 },
        spacer: { marginBottom: 10 },
        title: { fontSize: 48, marginBottom: 5 },
        body: { fontSize: 16 }
    });

    return (
        <View style={[styles.container]}>
            {/* Header (title) */}
            <View style={[styles.head]}>
                <Text style={[theme.titlePrimary, styles.title]}>MY JOURNEY</Text>
                <Text style={[theme.bodyPrimary, styles.body]}>Copyright: @2022 Hadi</Text>
            </View>

            {/* Body (input) */}
            <ScrollView
                style={[theme.container, styles.topCurve]}
                contentContainerStyle={{ paddingBottom: 60 }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="always"
            >
                {/* Email */}
                <Text style={[theme.body]}>Username</Text>
                <TextInput
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                    style={[theme.input]}
                    autoCapitalize='none'
                />

                <View style={[styles.spacer]} />

                {/* Password */}
                <Text style={[theme.body]}>Password</Text>
                <TextInput
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    style={[theme.input]}
                    secureTextEntry
                    autoCapitalize='none'
                />

                <View style={[styles.spacer]} />

                {/* Login button */}
                <Button onPress={onLogin} disabled={loading}
                >{loading ? <ActivityIndicator color={theme.colors.textPrimary} size="small" /> : "Login"}</Button>
            </ScrollView>

        </View>
    );
};

export default Login;