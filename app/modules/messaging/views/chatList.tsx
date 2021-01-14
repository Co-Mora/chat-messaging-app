import React, { useState } from 'react';
import { SafeAreaView, View, TouchableOpacity, StyleSheet } from 'react-native';
import { ListItem, Avatar, Button } from 'react-native-elements'
import AsyncStorage from '@react-native-community/async-storage';
import { CommonActions, useNavigation } from '@react-navigation/native'

const user =
{
    name: 'Amy Farha',
    avatar_url: 'https://placeimg.com/140/140/any',
    subtitle: 'Urgent Call Only'
};

const ChatList: React.FC = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);

    const logout = async () => {
        setLoading(true);
        await AsyncStorage.removeItem('token');
        setTimeout(() => {
            setLoading(false);
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{
                        name: 'Login',
                    }],
                }))
        }, 1000)
    }

    return (
        <SafeAreaView style={{ flex: 1, }}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Chat', { name: user.name })}>
                <ListItem bottomDivider>
                    <Avatar rounded source={{ uri: user.avatar_url }} />
                    <ListItem.Content>
                        <ListItem.Title>{user.name}</ListItem.Title>
                        <ListItem.Subtitle style={{ fontSize: 12 }}>{user.subtitle}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            </TouchableOpacity>
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                <Button loading={loading} titleStyle={styles.btnSigninText} title='Logout' containerStyle={styles.signInContainerBtn} buttonStyle={styles.signinBtn} onPress={logout} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    signInContainerBtn: {
        marginBottom: 5,
        marginLeft: 15,
        marginRight: 15,
    },
    signinBtn: {
        paddingBottom: 15,
        paddingTop: 15,
        backgroundColor: '#5AC9CC'
    },
    btnSigninText: {
        fontWeight: 'bold'
    },
})

export default ChatList;