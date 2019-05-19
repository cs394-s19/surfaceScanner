import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Spinner } from 'native-base';
import { Camera, Permissions } from 'expo';

export default class CameraPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cameraPermission: null
        };
    }

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            cameraPermission: status === "granted"
        });

        if (status === "granted") {
            this.captureInterval = setInterval(() => {
                this.camera.takePictureAsync({
                    quality: 0.0,
                    base64: true
                }).then(photo => {
                    this.props.connection.send(JSON.stringify({
                        action: "send_photo",
                        data: {
                            uuid: this.props.uuid,
                            data: photo.base64
                        }
                    }));
                });
            }, 5000);
        }
    }

    render() {
        if (this.state.cameraPermission === true) {
            return (
                <View style={styles.main}>
                    <Camera style={styles.main}
                            ref={ref => { this.camera = ref; }}
                            type={Camera.Constants.Type.front}
                            ratio="16:9" />
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