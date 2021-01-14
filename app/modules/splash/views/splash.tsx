import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Splash = () => {
    return (
        <View style={styles.viewContainer}>
            <Icon size={80} style={styles.iconHeader} color={'#A9B3BB'} name={'comment-dots'} />
        </View>
    )
}

const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#F9F9F9',
    },
    iconHeader: {
        textAlign: 'center'
    },
});

export default Splash;