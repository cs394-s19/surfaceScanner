import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Container, Header, Text, Title, Content, Button } from 'native-base';
import { ProgressBar, Colors } from 'react-native-paper';
import { NavigationEvents } from 'react-navigation';

export default class ScanInstru extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            timer: false
        }
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
                                Ensure that you are in a dimly lit environment. Turn off light, close binds.
                            </Text>
                        </View>
                        
                        <View style = {styles.imageContainer}>
                            <Image 
                                style = {styles.image} 
                                source = {require('../assets/images/demo.png')}
                            />
                        </View>
                        <View style = {styles.buttonContainer}>
                            <Button  style = {styles.button} block rounded large onPress = {() => navigate('SliderPage')}>
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
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: 'rgba(35, 35, 35, 0.3)'
    },
    text:{
        fontWeight: 'bold', 
        color: '#fff',
        fontSize: 18,
        textAlign: 'center'
    },
    image :{
        width: 350,
        height: 150,
        alignSelf: 'center'
    },
    imageContainer:{
        height: 220,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: 'rgba(191,85,236,1)',
    }
})

