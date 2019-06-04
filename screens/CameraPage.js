import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Spinner, ActionSheet } from 'native-base';
import { Camera, Permissions, LinearGradient } from 'expo';
import { Button } from 'native-base';


export default class CameraPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cameraPermission: null,
            gradient: [0.1, 0.3, 0.5, 0.7, 0.9],
        };

        this.captureIndex = 0;
    }

    setupInterval = () => {
        const { action } = this.props;

        clearInterval(this.captureInterval);

        if (!this.state.cameraPermission)
            return;

        switch (action) {
            case "waiting": {
                this.captureInterval = setInterval(() => {
                    this.camera.takePictureAsync({
                        quality: 0.0,
                        base64: true
                    }).then(photo => {
                        this.props.connection.send({
                            action: "send_photo",
                            data: {
                                uuid: this.props.uuid,
                                data: photo.base64
                            }
                        });
                    });
                }, 34);

                break;
            }
            case "scanning": {
                this.captureIndex = 0;

                this.captureInterval = setInterval(() => {
                    if (this.captureIndex >= 8) {
                        clearInterval(this.captureInterval);

                        this.props.connection.send({
                            action: "end_scan",
                            data: {
                                uuid: this.props.connection.uuid
                            }
                        });

                        return;
                    }

                    this.camera.takePictureAsync({
                        quality: 0.0,
                        base64: true
                    }).then(photo => {
                        this.props.connection.send({
                            action: "send_scan_photo",
                            data: {
                                uuid: this.props.uuid,
                                data: photo.base64,
                                index: this.captureIndex++
                            }
                        });
                    });
                }, 1000);

                break;
            }
        }
    }

    componentDidUpdate = () => {
        this.setupInterval();
    };

    componentWillUnmount = () => {
        clearInterval(this.captureInterval);
    };

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            cameraPermission: status === "granted"
        });

        this.setupInterval();
    }

    render() {
        if (this.state.cameraPermission === true) {
            return (
                <View style={styles.gradientContainer}>
                    <LinearGradient
                        colors={["black", "white","black", "white", "black"]}
                        locations={this.state.gradient}
                        style={{
                            flex: 1,
                            display: this.props.action == "scanning" ? 'flex' : 'none'
                        }} >
                    </LinearGradient>

                    <View style={{
                        flex: 1,
                        display: this.props.action == "scanning" ? 'none' : 'flex'
                    }}>
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
    gradientContainerHidden: {
        display: 'none',
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