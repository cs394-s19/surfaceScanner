import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Container, Header, Text, Title, Content, Button } from 'native-base';
import { ProgressBar, Colors } from 'react-native-paper';
import { NavigationEvents } from 'react-navigation';

export default class ScanInstru extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){

        const { navigate } = this.props.navigation;

        return(
            <Container >
                <Content contentContainerStyle={styles.container}>
                    <Header>
                        <Title> Step 3 </Title>
                    </Header>
                    <View style = {styles.progBar}>
                        <ProgressBar progress={0.95} color={Colors.red800} />
                    </View>
                    <View style = {styles.component}>
                        <View style = {styles.textContainer}>
                            <Text style = {styles.text}>
                                You can alter the 3D image using the sliders on the control device (this device).
                            </Text>
                        </View>
                        <View style = {styles.imageContainer}>
                            <Image
                                style = {styles.image}
                                source = {require('../assets/images/sliders.png')}
                            />
                        </View>
                        <View style = {styles.textContainer}>
                            <Text style = {styles.text}>
                                Once surrounding light is dimmed and the scanning device is fixed in a stable position, you are ready to scan.
                            </Text>
                        </View>
                        <View style = {styles.buttonContainer}>
                            <Button  style = {styles.button} block large onPress = {() => navigate('SliderPage')}>
                                <Text>
                                    Start Scan
                                </Text>
                            </Button>
                        </View>
                    </View>
                </Content>

            </Container>
        )
    }

}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column'
    },
    component:{
        flex:1,
        flexDirection: 'column',
        justifyContent: 'space-evenly'
    },
    progBar:{
        flexDirection: 'column',
        //height: 50
    },
    button:{
        alignSelf: 'stretch',
        textAlign: 'center',
        backgroundColor: 'red'
    },
    buttonContainer:{
        width: 180,
        alignSelf: 'center',
        marginBottom: 3
    },
    textContainer:{
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: '#fff'
    },
    text:{
        fontWeight: 'bold',
        color: '#000',
        fontSize: 16,
        textAlign: 'center'
    },
    image :{
        width: 150,
        height: 150,
        alignSelf: 'center'
    },
    imageContainer:{
        height: 220,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: '#fff',
    }
})
