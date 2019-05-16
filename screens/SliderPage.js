import React from 'react';
import {
    Slider,
    StyleSheet,
    Alert,
    Text
} from 'react-native';
import { Button } from 'react-native-elements';
import { View } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Ionicons } from '@expo/vector-icons';

const SliderFunc = ()=> ( <Slider
    style={{width: 200, height: 40}}
    minimumValue={0}
    maximumValue={1}
    minimumTrackTintColor="#FFFFFF"
    maximumTrackTintColor="#000000"
/>);

export default class SliderPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            setting: "Brightness"
        };
      }
    onButtonPress= (option) => {
        this.setState({setting: option})
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.filters}>
                <Button
                    icon={
                        <Icon
                        name="filter-tilt-shift"
                        size={30}
                        color='#00BCD4'/>
                    }
                    title=""
                    onPress={() => this.onButtonPress('Brightness')}
                />
                <Button
                    icon={
                        <Icon
                        name="filter-frames"
                        size={30}
                        color='#00BCD4'/>
                    }
                    title=""
                    onPress={() => this.onButtonPress('Contrast')}
                />
                <Button
                    icon={
                        <Icon
                        name="screen-lock-rotation"
                        size={30}
                        color='#00BCD4'/>
                    }
                    title=""
                    onPress={() => this.onButtonPress('White')}
                />
                <Button
                    icon={
                        <Icon
                        name="system-update-alt"
                        size={30}
                        color='#00BCD4'/>
                    }
                    title=""
                    onPress={() => this.onButtonPress('option 4')}
                />
                <Button
                    icon={
                        <Icon
                        name="zoom-out-map"
                        size={30}
                        color='#00BCD4'/>
                    }
                    title=""
                    onPress={() => this.onButtonPress('Balance')}
                />

                </View>
                <View style={styles.bottom}>
                    <Text style={{fontWeight: 'bold'}}>
                        {this.state.setting}
                    </Text>
                    <Slider
                        style={{width: 200, height: 40}}
                        minimumValue={0}
                        maximumValue={1}
                        minimumTrackTintColor="#00BCD4"
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
        backgroundColor: "#00BCD4",
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