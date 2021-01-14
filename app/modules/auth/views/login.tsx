import React, { useState } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    TextInput,
    Text,
    Dimensions,
    KeyboardAvoidingView,
    Keyboard
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { CommonActions, useNavigation } from '@react-navigation/native'
import { useForm, Controller } from 'react-hook-form';
import UUIDGenerator from 'react-native-uuid-generator';
const screenHeight = Math.round(Dimensions.get('window').height);

type FormValues = {
    email: string;
    password: string;
};

const Login: React.FC = () => {
    const navigation = useNavigation();
    const [securePassowrd, setSecurePassword] = useState(true);
    const [loading, setLoading] = useState(false);
    const { control, handleSubmit, errors } = useForm<FormValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit = async (data) => {
        setLoading(true);
        Keyboard.dismiss();
        const token = await UUIDGenerator.getRandomUUID()
        await AsyncStorage.setItem('token', token);
        setTimeout(() => {
            setLoading(false);
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{
                        name: 'ChatList',
                    }],
                }))
        }, 1200)
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView style={styles.keyboardAvoidContainer} behavior='padding' enabled={true} keyboardVerticalOffset={100}>
                <View style={styles.header}>
                    <Icon size={80} style={styles.iconHeader} color={'#A9B3BB'} name={'comment-dots'} />
                    <Text style={styles.textHeader}>Intrinsik OMS</Text>
                </View>
                <View style={styles.formContainer}>
                    <Text style={styles.heading}>Sign In</Text>
                    <View>
                        <View style={styles.inputForm}>
                            <Controller
                                control={control}
                                name='email'
                                // @ts-ignore
                                render={({ onChange, onBlur, onFocus, value }) => (
                                    <TextInput style={styles.inputEmailField} onBlur={onBlur} onFocus={onFocus} placeholder={'Email Address'} placeholderTextColor='#858F95' onChangeText={value => onChange(value)} value={value} />
                                )}
                                rules={{ required: true }}
                            />
                        </View>
                        <View style={styles.errorContainer}> {errors.email && <Text style={styles.fieldError}>Email Address is required.</Text>}</View>
                    </View>
                    <View>
                        <View style={styles.inputForm}>
                            <View style={styles.passwordContainer}>
                                <Controller
                                    control={control}
                                    name='password'
                                    // @ts-ignore
                                    render={({ onChange, onFocus, onBlur, value }) => ( <TextInput style={styles.inputPasswordField} onBlur={onBlur} onFocus={onFocus} placeholder='Password' secureTextEntry={securePassowrd} placeholderTextColor='#858F95' onChangeText={value => onChange(value)} value={value} /> )}
                                    rules={{ required: true, minLength: 9, pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/ }}
                                />
                                <View style={styles.passwordIcon}>
                                    <Icon style={styles.rightIcon} name={securePassowrd ? 'eye-slash' : 'eye'} size={20} color='gray' onPress={() => setSecurePassword(!securePassowrd)} />
                                </View>
                            </View>
                        </View>
                        <View style={styles.errorContainer}>
                            {errors.password && <Text style={styles.fieldError}>Password is required min 8 length. at least one number, one lowercase and one uppercase letter</Text>}
                        </View>
                    </View>
                    <Button loading={loading} titleStyle={styles.btnSigninText} title='Sign In' containerStyle={styles.signInContainerBtn} buttonStyle={styles.signinBtn} onPress={handleSubmit(onSubmit)} />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    container: {
        backgroundColor: '#FFF',
        padding: 10,
        height: screenHeight,
    },
    keyboardAvoidContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    header: {
        flexDirection: 'column',
        marginBottom: 20,
        justifyContent: 'center',
        flex: 1,
    },
    iconHeader: {
        textAlign: 'center'
    },
    textHeader: {
        color: '#A9B3BB',
        textAlign: 'center'
    },
    heading: {
        fontSize: 27,
        fontWeight: 'bold',
        paddingLeft: 15,
        paddingBottom: 20
    },
    formContainer: {
        flex: 1,
        justifyContent: 'center',

    },
    inputForm: {
        marginBottom: 5,
        marginTop: 5,
        borderColor: '#DDD',
        borderWidth: 0.6,
        borderRadius: 5,
        marginLeft: 15,
        marginRight: 15,
    },
    inputEmailField: {
        fontSize: 15,
        backgroundColor: '#F6F6F6',
        height: 50, paddingLeft: 15,
    },
    inputPasswordField: {
        flex: 1,
        backgroundColor: '#F6F6F6',
        fontSize: 15,
        height: 50,
        paddingLeft: 15,
    },
    passwordIcon: {
        justifyContent: 'center',
        backgroundColor: '#F6F6F6',
    },
    passwordContainer: {
        flexDirection: 'row',
    },
    rightIcon: {
        paddingRight: 15,
    },
    fieldError: {
        paddingLeft: 5,
        marginLeft: 15,
        marginRight: 50,
        fontSize: 11,
        color: '#E02D2D'
    },
    errorContainer: {
        flexDirection: 'column'
    },
    signInContainerBtn: {
        marginTop: 5,
        marginLeft: 15,
        marginRight: 15,
        elevation: 3,
    },
    signinBtn: {
        paddingBottom: 15,
        paddingTop: 15,
        backgroundColor: '#5AC9CC'
    },
    btnSigninText: {
        fontWeight: 'bold'
    },
    signUpContainerBtn: {
        marginLeft: 15,
        marginRight: 15,
        marginTop: 20,
    },
    signupBtn: {
        paddingBottom: 15,
        paddingTop: 15,
    },
    btnSignupText: {
        fontWeight: 'bold',
        color: '#5AC9CC'
    },


});

export default Login;