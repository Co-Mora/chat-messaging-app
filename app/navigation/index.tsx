
import React, { useEffect, useState } from 'react';
import { Alert, BackHandler } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../modules/auth/views/login';
import Chat from '../modules/messaging/views/chat'
import ChatList from '../modules/messaging/views/chatList';
import AsyncStorage from '@react-native-community/async-storage';
import Splash from '../modules/splash/views/splash';
import NetInfo from '@react-native-community/netinfo';

const Stack = createStackNavigator();
const ChatStack = createStackNavigator();

export interface Props {
    route: any
}

const Navigation: React.FC<Props> = () => {
    const [token, setToken] = useState();
    const [loading, setLoading] = useState(true);

    const checkToken = async () => {
        const token = await AsyncStorage.getItem('token')
        setToken(token);
    }

    const handleNetworkIssue = () => {
        NetInfo.fetch().then(({ isConnected }) => {
            if (isConnected) setTimeout(() => {
                setLoading(false);
            }, 500)
            else Alert.alert(
                'No Connection Found',
                'Please Check your network cnnection',
                [
                    { text: 'OK', onPress: () => BackHandler.exitApp() },
                ]
            );
        })
    }

    const ChatStackScreen: React.FC<Props> = ({ route }) => {
        const { name }  = route.params;

        return (
            <ChatStack.Navigator>
                <ChatStack.Screen
                    name='Chat'
                    component={Chat}
                    options={{
                        headerTitle: name
                    }}
                />
            </ChatStack.Navigator>
        );
    }

    useEffect(() => {
        handleNetworkIssue();
        checkToken();
    }, [token]);
    return (
        loading ? <Splash /> : <Stack.Navigator initialRouteName={token ? 'ChatList' : 'Login'}>
            <Stack.Screen options={{ animationEnabled: false, headerShown: false }} name='Login' component={Login} />
            <Stack.Screen initialParams={{ name: '' }} options={{ headerShown: false }} name='Chat' component={ChatStackScreen} />
            <Stack.Screen options={{ headerShown: false }} name='Splash' component={Splash} />
            <Stack.Screen options={{ headerTitle: 'Contacts' }} name='ChatList' component={ChatList} />
        </Stack.Navigator>

    )
}
export default Navigation;