import React from 'react';
import { View, StyleSheet } from 'react-native'; 
import { Button, Text, Container, Content } from 'native-base';
import { Font, AppLoading } from 'expo';


export default class ControlScanScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fontsLoaded: false
        }
    }

    loadFonts = Font.loadAsync.bind(this, {
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });

    render() {
        const { navigate } = this.props.navigation;

        if (this.state.fontsLoaded) {
            return (
                <Container>
                    <Content contentContainerStyle={styles.container}>
                        <View style={styles.buttonContainer}>
                            <Button style={styles.button} block rounded dark large onPress={() => navigate('SliderPage')}>
                                <Text>Control</Text>
                            </Button>
                            <Button style={styles.button} block rounded large onPress={() => navigate('QRCodePage')}>
                                <Text>Scan</Text>
                            </Button>
                        </View>
                    </Content>
                </Container>
            );
        } else {
            return (
                <AppLoading startAsync={this.loadFonts}
                            onFinish={() => this.setState({fontsLoaded: true})} />
            );
        }

        
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        alignSelf: 'stretch',
        textAlign: 'center',
        marginBottom: 8
    },
    buttonContainer: {
        width: 250
    },
    spinnerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center' 
    }
});
