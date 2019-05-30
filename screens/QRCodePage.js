import React from 'react';
import QRCode from 'react-native-qrcode';
import { StyleSheet, View } from 'react-native';
import { Container, Text, Spinner } from "native-base";
import CameraPage from './CameraPage';
import Connection from './Connection';

export default class QRCodePage extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      qr_text: null,
      control_connected: false,
      values: {
        zoom: 0,
      },
      server: "cloud"
    };

    this.ws = new Connection("scan", this.onmessage);
  }

  onmessage = (action, data) => {
    if (action === "set_uuid") {
      const { uuid } = data;
      this.setState({qr_text: uuid})
    } else if (action === "control_connected") {
      this.setState({control_connected: true});
    } else if (action === "send_control_info") {
      const { key, value } = data;

      this.setState(state => {
        return({
          values: {
            ...state.values,
            [key]: value
          }
        });
      });
    }
  };

  render() {
    if (this.state.control_connected) {
      return (<CameraPage connection={this.ws} uuid={this.state.qr_text} control={this.values}/>)
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