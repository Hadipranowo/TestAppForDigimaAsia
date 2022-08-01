import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    Image,
    useWindowDimensions,
    TouchableOpacity,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

import { Http } from '../http';
import { useUserContext, useThemeContext, useUtilityContext } from '../context';

export const Journey = (props) => {
    const util = useUtilityContext();
    const theme = useThemeContext();
    const userContext = useUserContext();
    const userValue = userContext.getValue();
    const window = useWindowDimensions();

    const [journeys, setJourneys] = useState([]);
    const [loading, setLoading] = useState(true);

    const getJourney = () => {
        setLoading(true);

        Http({
            method: 'get',
            url: '/journey',
            headers: {
                TOKEN: userValue.token
            }
        }).then((res) => {
            const _status = res.data?.status || res.status;
            const _data = res.data?.data || {};
            if (_status === 200) {
                setJourneys(_data.journeys);
            } else {
                throw { response: res }
            }
        }).catch((err) => {
            console.log('Error in getJourney', err.response.status, err.response.data);
            util.showSnackbar(err.response.data?.message || 'Something when wrong');
        }).finally(() => {
            setLoading(false);
        })
    };

    useEffect(() => {
        setJourneys([]);
        getJourney();
    }, []);

    const styles = StyleSheet.create({
        card: {
            height: window.width > 600 ? 600 : 400,
            width: '100%',
            borderWidth: 1,
            borderColor: theme.colors.textBackground,
            borderRadius: 8,
            marginBottom: 20,
            backgroundColor: 'transparent'
        },
        cardInfo: {
            flex: 1,
            padding: 20,
            justifyContent: 'space-between'
        },
        cardAction: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        title: { textAlign: 'center', fontSize: 16 },
        body: { textAlign: 'center', fontSize: 14 }
    });

    const renderCard = (item = {}, index = 0) => {
        return <View style={[styles.card]}>
            {/* Image */}
            <Image
                source={{ uri: item.thumbnail }}
                style={{
                    height: styles.card.height * 0.6,
                    width: styles.card.width,
                    borderRadius: styles.card.borderRadius
                }}
                resizeMode="contain"
            />

            <View style={[styles.cardInfo]}>
                {/* Title & desc */}
                <View>
                    <Text style={[theme.title, { fontWeight: '700' }]} numberOfLines={1}>{item.name || "No title yet."}</Text>
                    <Text style={[theme.body, { marginVertical: 6 }]} numberOfLines={window.width > 600 ? 4 : 2}>{item.description || "No description yet."}</Text>
                </View>

                {/* Icons */}
                <View style={[styles.cardAction]}>
                    {/* Leaderboard */}
                    <TouchableOpacity style={[styles.cardAction]} activeOpacity={1}
                        onLongPress={(e) => util.showTooltip(item.is_leaderboard ? "Leaderboard: yes" : "Leaderboard: no", e.nativeEvent)}
                    >
                        <MaterialIcons
                            name='leaderboard'
                            size={theme.title.fontSize - 2}
                            color={theme.title.color}
                        />
                        <Text style={[theme.title, { marginLeft: 4 }]}>{item.is_leaderboard}</Text>
                    </TouchableOpacity>

                    {/* Point */}
                    <TouchableOpacity style={[styles.cardAction]} activeOpacity={1}
                        onLongPress={(e) => util.showTooltip(`Point: ${item.point}`, e.nativeEvent)}
                    >
                        <MaterialIcons
                            name='star'
                            size={theme.title.fontSize - 2}
                            color={theme.title.color}
                        />
                        <Text style={[theme.title, { marginLeft: 4 }]}>{item.point}</Text>
                    </TouchableOpacity>

                    {/* Completition */}
                    <TouchableOpacity style={[styles.cardAction]} activeOpacity={1}
                        onLongPress={(e) => util.showTooltip(item.is_completed ? "Complete: yes" : "Complete: no", e.nativeEvent)}
                    >
                        <Entypo
                            name='progress-two'
                            size={theme.title.fontSize + 2}
                            color={theme.title.color}
                        />
                        <Text style={[theme.title, { marginLeft: 4 }]}>{(item.is_completed * 100) + '%'}</Text>
                    </TouchableOpacity>

                    {/* Available */}
                    <TouchableOpacity style={[styles.cardAction]} activeOpacity={1}
                        onLongPress={(e) => util.showTooltip(item.is_available ? "Available: yes" : "Available: no", e.nativeEvent)}
                    >
                        <MCIcons
                            name='progress-check'
                            size={theme.title.fontSize - 1}
                            color={theme.title.color}
                        />
                        <Text style={[theme.title, { marginLeft: 4 }]}>{item.is_available}</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    };

    if (loading) {
        return <View style={[theme.container, { alignItems: 'center', justifyContent: 'center' }]}>
            <ActivityIndicator color={theme.colors.textBackground} size="large" />
        </View>
    }
    return (
        <View style={[theme.container]}>
            {/* Welcome */}
            <View style={{ paddingTop: 10, paddingHorizontal: 5 }}>
                <Text style={[theme.title, styles.title]}
                >Welcome back, {userValue.firstname} {userValue.lastname}</Text>
                <Text style={[theme.title, styles.body]}
                >Device: {`${userValue.platform} (${userValue.brand})`}</Text>
            </View>

            {/* Data */}
            <FlatList
                data={journeys}
                keyExtractor={(item, index) => index}
                renderItem={({ item, index }) => renderCard(item, index)}
                contentContainerStyle={{ padding: 20 }}
            />
        </View>
    );
};

export default Journey;