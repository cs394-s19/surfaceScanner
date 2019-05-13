import React, { Component } from 'react';
import { Container, Header, Content, Button, Text, View } from 'native-base';

export default class ButtonRoundedExample extends Component {

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={{ flex: 1, position: 'relative', top: 350, alignItems: "center" }}>
                <Container>
                    <Button rounded dark large full onPress={() => navigate('SliderPage')}>
                        <Text>Control</Text>
                    </Button>
                    <Text>  </Text>
                    <Button rounded large full onPress={() => navigate('SliderPage')}>
                        <Text>Scan</Text>
                    </Button>
                </Container>

            </View>

        );
    }
}
