import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Spinner, Container, Header, Text, Title, Content, Button } from 'native-base';
import { NavigationEvents } from 'react-navigation';


export default class ScanInstru extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            timer: false
        }
    }

    changeTimer = () => {
        console.log('is it here?')
        setTimeout(() => {
            this.setState({
                timer: true
            })}, 5000
        );
        console.log('new state', this.state.timer)
    }



    render(){

        const { navigate, getParam } = this.props.navigation;  
        this.changeTimer()
        setInterval(
            () => {console.log('state is', this.state.timer)}, 1000
        )

        if (!this.state.timer){
            return(
                <Container >
                    <Content contentContainerStyle={styles.container}>
                        <Header>
                            <Title> Model </Title>
                        </Header>
                
                        <View style = {styles.component}>
                            <View style = {styles.imageContainer}>
                            <View>
                                < Spinner />
                            </View>
                            </View>
                            <View style = {styles.buttonContainer}>
                                <Button  style = {styles.button} block rounded large onPress = {() => navigate('SliderPage')}>
                                    <Text>
                                        Back
                                    </Text>
                                </Button>
                            </View>
                        </View>
                    </Content>
    
                </Container>
            )
            
        }
        else {
            return(
                <Container >
                    <Content contentContainerStyle={styles.container}>
                        <Header>
                            <Title> Model </Title>
                        </Header>
                
                        <View style = {styles.component}>
                            <View style = {styles.imageContainer}>
                            <Image
                                style = {styles.image}
                                source = {require('../assets/images/model.png')}
                            />
                            </View>
                            <View style = {styles.buttonContainer}>
                                <Button  style = {styles.button} block rounded large onPress = {() => navigate('SliderPage')}>
                                    <Text>
                                        Back
                                    </Text>
                                </Button>
                            </View>
                        </View>
                    </Content>
    
                </Container>
            )
            
        }
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
        width: 350,
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