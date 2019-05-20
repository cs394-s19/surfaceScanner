import React from 'react';
import QRCode from 'react-native-qrcode';
import { StyleSheet, View } from 'react-native';
import { Container, Text, Spinner } from "native-base";
import CameraPage from './CameraPage';

export default class QRCodePage extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      qr_text: null,
      control_connected: false
    };

    this.ws = new WebSocket("https://boiling-harbor-73257.herokuapp.com/");

    this.ws.onopen = () => {
      this.ws.send(JSON.stringify({
        action: "set_party",
        data: {
          party: "scan"
        }
      }));
    };

    this.ws.onmessage = e => {
      const { action, data } = JSON.parse(e.data);
      if (action === "set_uuid") {
        const { uuid } = data;
        this.setState({qr_text: uuid})
      } else if (action === "control_connected") {
        this.setState({control_connected: true});
      }
    };
  }

  render() {
    if (this.state.control_connected) {
      return (<CameraPage connection={this.ws} uuid={this.state.qr_text} />)
    } else {
      if (this.state.qr_text === null) {
        return (
          <View style={styles.spinner}>
            <Spinner />
          </View>
        );
      } else {
        return (
          <View style={styles.container}>
            <QRCode value={this.state.qr_text}
                    size={300}
                    bgColor='black'
                    fgColor='white'/>
            <Text style={styles.qr_text}>Please scan this QR code with the control device.</Text>
          </View>
        );
      }
    }
  };
}

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  qr_text: {
    fontSize: 24,
    textAlign: 'center'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly'
  }
})