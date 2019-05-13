import React from 'react';
import {
    Slider,
    StyleSheet
} from 'react-native';
import { Container, Header, Content, Button, Text, View } from 'native-base';

export default class SliderPage extends React.Component {

    render() {
        return (
            <View>
                <Container>
                <Slider
                    style={{width: 200, height: 40}}
                    minimumValue={0}
                    maximumValue={1}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#000000"
                />
                </Container>
            </View>
        )
    }
}

// const styles = StyleSheet.create({
//
// });