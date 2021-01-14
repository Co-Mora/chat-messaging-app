import React, { useEffect, useCallback, useState, useRef } from 'react';
import { StyleSheet, SafeAreaView, View, Image, Text } from 'react-native';
import { GiftedChat, Bubble, Time, Send, InputToolbar } from 'react-native-gifted-chat';
import { connect } from 'react-redux';
import { getUserMessages } from '../../../actions'
import Icon from 'react-native-vector-icons/FontAwesome5';
import UUIDGenerator from 'react-native-uuid-generator';
import _ from 'lodash';

export interface Props {
    getUserMessages: () => void
    userMessages: []
}

const Chat: React.FC<Props> = ({ getUserMessages, userMessages }) => {
    const mounted = useRef();

    const [messages, setMessages] = useState([]);
    const [randomMessages, setRandomMessages] = useState([]);

    const [isTypingNow, setIsTypingNow] = useState(false);

    const onSend = useCallback(async (messages = []) => {
        const stringMessages = JSON.stringify(randomMessages);
        const parsedMessages = JSON.parse(stringMessages)
        const message = _.sample(parsedMessages);
        const uuid = await UUIDGenerator.getRandomUUID()
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
        setIsTypingNow(true)
        setTimeout(() => {
            setMessages(previousMessages => GiftedChat.append(previousMessages, {
                // @ts-ignore
                _id: uuid,
                text: message.city,
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'David',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            }))
            setIsTypingNow(false)
        }, 1200)



    }, [])

    const renderToolBarInput = (props) => {
        return (
            <InputToolbar {...props} />
        )
    }

    const renderBubble = (props) => {
        return (
            <Bubble {...props} renderTicks={() => <Text>✓✓</Text>} tickStyle={{ color: '#FFF' }} wrapperStyle={{ right: { backgroundColor: 'none', borderColor: '#58C8CB', borderWidth: 3 }, left: { backgroundColor: '#58C8CB' } }} textStyle={{ right: { color: '#58C8CB' }, left: { color: '#FFF' } }} />
        )
    }

    const renderTime = (props) => {
        return (
            <Time
                {...props}
                timeTextStyle={{
                    right: {
                        color: '#58C8CB'
                    },
                    left: {
                        color: '#FFF'
                    }
                }}
            />
        )
    }

    const renderSend = (props) => {
        return (
            <Send {...props} >
                <View style={{ marginRight: 10, marginBottom: 5 }}>
                    <Icon size={30} color={'#59C9CC'} name={'paper-plane'} />
                </View>
            </Send>
        )
    }
    const renderAction = () => {
        return (
            <View>
                <Icon size={30} style={{ paddingTop: 5, paddingLeft: 10, paddingBottom: 5 }} color={'#C7C7C7'} name={'paperclip'} />
            </View>
        )
    }

    const renderChatEmpty = () => {
        return (
            <View style={styles.chatEmptyContainer}>
                <Image source={require('../assets/begin_conversation.png')} style={styles.emptyImageContainer} />
            </View>
        )
    }

    useEffect(() => {

        if (!mounted.current) {
            getUserMessages();
            //@ts-ignore
            mounted.current = true;
        } else {
            if (userMessages.length > 0) setRandomMessages(userMessages)
        }

    }, [userMessages.length, randomMessages.length]);


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <GiftedChat placeholder={'Type here...'} isTyping={isTypingNow} scrollToBottom alwaysShowSend={true} messagesContainerStyle={{ backgroundColor: '#FFF' }} renderTime={renderTime} renderActions={renderAction} renderChatEmpty={renderChatEmpty} renderInputToolbar={renderToolBarInput} renderBubble={renderBubble} renderSend={renderSend} messages={messages} onSend={messages => onSend(messages)} user={{ _id: 1 }} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    tick: {
        fontSize: 10,
        backgroundColor: 'transparent',
        color: 'white',
    },
    tickView: {
        flexDirection: 'row',
        marginRight: 10,
    },
    chatEmptyContainer: {
        transform: [{ rotate: '180deg' }],
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    emptyImageContainer: {
        resizeMode: 'cover',
        width: 200,
        height: 150,
    }
});


const mapStateToProps = ({ userMessages }) => {
    return { userMessages }
}


export default connect(mapStateToProps, { getUserMessages })(Chat);
