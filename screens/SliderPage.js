import React from 'react';
import {
    Slider,
    StyleSheet,
    Button,
    Alert
} from 'react-native';
import { View } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';


const SliderFunc = ()=> ( <Slider
    style={{width: 200, height: 40}}
    minimumValue={0}
    maximumValue={1}
    minimumTrackTintColor="#FFFFFF"
    maximumTrackTintColor="#000000"
/>);

export default class SliderPage extends React.Component {
    onButtonPress= () => {
        Alert.alert('Button has been pressed!');
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.filters}>
                   <Icon
                        name="filter-tilt-shift"
                        size={30}
                        color='#841584'/>
                    <Icon
                        name="filter-frames"
                        size={30}
                        color='#841584'/>
                    <Icon
                        name="screen-lock-rotation"
                        size={30}
                        color='#841584'/>
                    <Icon
                        name="system-update-alt"
                        size={30}
                        color='#841584'/>
                    <Icon
                        name="zoom-out-map"
                        size={30}
                        color='#841584'/>
                </View>
                <View style={styles.bottom}>
                    <Slider
                        style={{width: 200, height: 40}}
                        minimumValue={0}
                        maximumValue={1}
                        minimumTrackTintColor="#FFFFFF"
                        maximumTrackTintColor="#000000"
                    />
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-end',
    },
    bottom: {
        backgroundColor: "#F7F7F7",
        height: '20%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    filters: {
        backgroundColor: "#808080",
        alignItems: 'center',
        height: '10%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    button: {
        backgroundColor: "red",
    }
});