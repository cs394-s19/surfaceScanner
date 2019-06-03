import React from 'react';
import { StyleSheet, Text, View, Image, Slider } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Camera, BarCodeScanner, Permissions } from 'expo';
import { Spinner,Container, Header, Left, Body, Right, Title } from 'native-base';

const ButtonIcon = ({ name }) => {
    return (
        <Icon name={name}
              size={30}
              color='#2196F3'/>
    )
}

export default class SliderPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: "set up mode",
            active: "brightness",
            connected: false,
            cameraPermission: null,
            previewPhoto: null,
            values: {
                brightness: 0,
                contrast: 0,
                saturation: 0,
                balance: 0,
                exposure: 0
            },
            server: "local"
        };
    }

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            cameraPermission: status === "granted"
        });
    }

    onButtonPress = option => {
        this.setState({
            active: option
        });
    };

    createConnection = uuid => {
        // TODO: add a config file with environment configurations such as which url to use for websockets
        if (this.state.server === "local") {
            this.ws = new WebSocket("http://10.105.169.37:5000/");
        }
        else {
            this.ws = new WebSocket("https://boiling-harbor-73257.herokuapp.com/");
        }
        this.uuid = uuid;
        this.ws.onopen = () => {
            this.setState({connected: true});
            this.ws.send(JSON.stringify({
                action: "set_party",
                data: {
                    party: "control",
                    uuid: uuid
                }
            }))
        };

        this.ws.onmessage = e => {
            const { action, data } = JSON.parse(e.data);

            if (action === "send_photo") {
                this.setState({previewPhoto: "data:image/jpg;base64," + data});
            }

            if (action === "take_picture"){
                this.setState({previewPhoto: ""});
            }
        }
    }

    onValueChange = value => {
        if (this.state.active === "zoom" || this.state.active === "whiteBalance" ) {
            this.ws.send(JSON.stringify({
                action: "set_control_info",
                data: {
                    key: this.state.active,
                    value: value,
                    uuid: this.uuid
                }
            }))
        }

        this.setState(state => {
            return ({
                values: {
                    ...state.values,
                    [state.active]: value
                }
            });
        });
    };

    StartScan = () => {
        this.setState({
            mode: "scan mode"
        });
        console.log('the state1 is ', this.state.action)

        this.ws.send(JSON.stringify({

            action:"take_picture",
            data: {

                uuid: this.uuid
            }
            }
        ))
        console.log('the state2 is ', this.state.action)
    };


    onBarcodeScanned = ({ type, data }) => {
        console.log(data);

        if (type == BarCodeScanner.Constants.BarCodeType.qr) {
            this.createConnection(data);
        }
    };

    render() {
        const { previewPhoto } = this.state;
        const { navigate } = this.props.navigation;

        if (this.state.connected) {
            return (

                <View style={styles.container}>
                    <Header>

                        <Body>
                        <Title>{this.state.mode}</Title>
                        </Body>
                        <Right>
                            <Button hasText transparent
                                    onPress={() => this.StartScan()}>
                                <Text>Start Scan</Text>
                            </Button>
                        </Right>
                    </Header>


                    <Image style={styles.imagePreview}
                           source={{uri: previewPhoto == null ? null : previewPhoto.replace(/\s/g, '')}}
                           fadeDuration={0} />
                    <View style={styles.bottom}>
                        <View style={styles.filters}>
                            <Button icon={<ButtonIcon name="filter-tilt-shift" />}
                                    title=""
                                    onPress={() => this.onButtonPress('brightness')}
                                    type="clear" />
                            <Button icon={<ButtonIcon name="filter-frames" />}
                                    title=""
                                    onPress={() => this.onButtonPress('contrast')}
                                    type="clear" />
                            <Button icon={<ButtonIcon name="screen-lock-rotation" />}
                                    title=""
                                    onPress={() => this.onButtonPress('saturation')}
                                    type="clear" />
                            <Button icon={<ButtonIcon name="system-update-alt" />}
                                    title=""
                                    onPress={() => this.onButtonPress('exposure')}
                                    type="clear" />
                            <Button icon={<ButtonIcon name="zoom-out-map" />}
                                    title=""
                                    onPress={() => this.onButtonPress('zoom')}
                                    type="clear" />
                            <Button  style = {styles.button} block rounded large onPress = {() => navigate('PresentPage')}>
                                <Text>
                                    Back
                                </Text>
                            </Button>
                        </View>
                        <View style={styles.sliderContainer}>
                            <Text style={styles.caption}>
                                {this.state.active.charAt(0).toUpperCase() + this.state.active.slice(1)}
                            </Text>
                            <Slider style={styles.slider}
                                    minimumValue={0}
                                    maximumValue={1}
                                    onValueChange={this.onValueChange}
                                    value={this.state.values[this.state.active]}
                                    minimumTrackTintColor="#00BCD4"
                                    maximumTrackTintColor="#000000" />
                        </View>
                    </View>
                </View>
            );
        } else {
            if (this.state.cameraPermission === true) {
                return (
                    <View style={styles.cameraContainer}>
                        <Camera style={styles.camera}
                                onBarCodeScanned={this.onBarcodeScanned}
                                ratio="16:9">
                            <View style={styles.cameraOverlay}>
                                <View style={styles.messageContainer}>
                                    <Text style={styles.overlayText}>Open this app on the scanning device and scan the QR code shown.</Text>
                                </View>
                            </View>
                        </Camera>
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
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
    },
    bottom: {
        backgroundColor: "#F7F7F7",
        justifyContent: 'center',
        alignItems: 'center'
    },
    filters: {
        backgroundColor: "#E0E0E0",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        alignSelf: 'stretch'
    },
    caption: {
        fontWeight: 'bold'
    },
    slider: {
        width: 200,
        height: 40
    },
    cameraContainer: {
        flex: 1
    },
    camera: {
        flex: 1
    },
    sliderContainer: {
        alignItems: 'center',
        height: 100,
        justifyContent: 'center'
    },
    imagePreview: {
        flex: 1,
        width: '100%'
    },
    permissionsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    message: {
        fontSize: 32
    },
    cameraOverlay: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    messageContainer: {
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: 'rgba(35, 35, 35, 0.3)'
    },
    overlayText: {
        fontWeight: 'bold', 
        color: '#fff',
        fontSize: 24,
        textAlign: 'center'
    }
});