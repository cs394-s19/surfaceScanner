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
                        <Title> Step 1 </Title>
                    </Header>
                    <View style = {styles.progBar}>
                        <ProgressBar progress={0.33} color={Colors.red800} />
                    </View>
                    <View style = {styles.component}>
                        <View style = {styles.textContainer}>
                            <Text style = {styles.text}>
                                Ensure that you are in a dimly lit environment. Turn off lights, close blinds.
                            </Text>
                        </View>
                        <View style = {styles.imageContainer}>
                            <Image
                                style = {styles.image}
                                source = {require('../assets/images/lights-off.png')}
                            />
                        </View>
                        <View style = {styles.buttonContainer}>
                            <Button  style = {styles.button} block rounded large onPress = {() => navigate('ScanInstru1')}>
                                <Text>
                                    Next
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
    },
    buttonContainer:{
        width: 180,
        alignSelf: 'center',
        marginBottom: 3
    },
    textContainer:{
        height: 50,
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
        width: 250,
        height: 250,
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
