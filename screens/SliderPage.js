import React from 'react';
import {
    Slider,
    StyleSheet
} from 'react-native';
import { Container, View } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';


const SliderFunc = ()=> ( <Slider
    style={{width: 200, height: 40}}
    minimumValue={0}
    maximumValue={1}
    minimumTrackTintColor="#FFFFFF"
    maximumTrackTintColor="#000000"
/>);

export default class SliderPage extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.filters}>
                    <Icon
                        name="ios-add"
                        color="#ccc"
                        size={25}
                    />
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
        backgroundColor: "#a9a9a9",
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
    }
});