import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Spinner } from 'native-base';
import { Camera, Permissions, LinearGradient } from 'expo';
import { Button } from 'native-base';


export default class CameraPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cameraPermission: null,
            gradient: [0.1, 0.3, 0.5, 0.7, 0.9],
        };
    }

    componentWillUnmount = () => {
        clearInterval(this.captureInterval);
    };

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        let i = 1;
        this.setState({
            cameraPermission: status === "granted"
        });

        console.log('rerenders???')

        if (status === "granted"  && this.props.action === null) {
            this.captureInterval = setInterval(() => {

                if (this.props.action === "take_picture")
                {
                    console.log("1")
                    clearInterval(this.captureInterval);
                }

                console.log("2")

                this.camera.takePictureAsync({
                    quality: 0.0,
                    base64: true
                }).then(photo => {
                    this.updateGradient();
                    this.props.connection.send({
                        action: "send_photo",
                        data: {
                            uuid: this.props.uuid,
                            data: photo.base64,
                            index: 0
                        }
                    });
                });
            }, 34);

            console.log('3')
            
        }

        console.log('i is', i, 'action', this.props.action)
        while (status === "granted" && i < 9 && this.props.action === "take_picture") {
            console.log('taking pic', i )
            this.captureInterval = setInterval(() => {
                this.camera.takePictureAsync({
                quality: 0.0,
                base64: true
                }).then(photo => {
                    this.updateGradient()
                    this.props.connection.send(JSON.stringify({
                        action: "take_picture",
                        data: {
                            uuid: this.props.uuid,
                            data: photo.base64,
                            index: i
                        }
                    }));
                });
            }, 5000);
            i = i + 1;
        }
    }

    componentWillUnmount = () => {
        clearInterval(this.captureInterval);
    };

    updateGradient = () => {
        gradient = this.state.gradient;
        result = []
        if(gradient[0] > 1.0){
            result.push(0)
        }
        else{
            result.push(gradient[0] + 0.1)
        }
        if(gradient[1] > 1.0){
            result.push(0)
        }
        else{
            result.push(gradient[1] + 0.1)
        }
        if(gradient[2] > 1.0){
            result.push(0)
        }
        else{
            result.push(gradient[2] + 0.1)
        }
        if(gradient[3] > 1.0){
            result.push(0)
        }
        else{
            result.push(gradient[3] + 0.1)
        }
        if(gradient[4] > 1.0){
            result.push(0)
        }
        else{
            result.push(gradient[4] + 0.1)
        }
        this.setState({gradient: result})
    }

    render() {
        if (this.state.cameraPermission === true) {
            return (
                <View style={styles.gradientContainer}>
                    <LinearGradient
                        colors={["black", "white","black", "white", "black"]}
                        locations={this.state.gradient}
                        style={{
                            flex:1
                        }} >
                    </LinearGradient>

                    <View style={{width :0, height : 0}}>
                        <Camera style={styles.main}
                                ref={ref => { this.camera = ref; }}
                                type={Camera.Constants.Type.front}
                                ratio="16:9" />
                    </View>
                </View>
            );
        } else if (this.state.cameraPermission === false) {
            return (
              <View style={styles.permissionsContainer}>
                  <Text style={styles.message}>Please give camera permissions.</Text>
              </View>
            );
        } else if (this.state.cameraPermission === null) {
            return (
              <View style={styles.permissionsContainer}>
                  <Spinner />
              </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    gradientContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
    },
    main: {
        flex: 1,
    },
    permissionsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    message: {
        fontSize: 32
    }
})