import React from 'react';
import QRCode from 'react-native-qrcode';
import { StyleSheet, View } from 'react-native';
import { Container, Text, Spinner } from "native-base";
import CameraPage from './CameraPage';

export default class QRCodePage extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      action: null,
      qr_text: null,
      control_connected: false,
      values: {
        zoom: 0,
      },
      server: "local"
    };

    if (this.server === "local") {
      this.ws = new WebSocket("http://10.105.169.37:5000/");
    }
    else {
      this.ws = new WebSocket("https://boiling-harbor-73257.herokuapp.com/");
    }



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
      console.log('the state3 is ', this.state.action)
      if (action === "set_uuid") {
        const { uuid } = data;
        this.setState({qr_text: uuid})
      } else if (action === "control_connected") {
        this.setState({control_connected: true});
      }
        else if (action === "take_picture") {
        console.log('the state4 is ', this.state.action)
        this.setState({action: "take_picture"});
      }
      else if (action === "send_control_info") {
        const { key, value } = data;

        this.setState( state => {
        return({ values:
              {
                ...state.values,
                [key]: value
              }
        });
        });
      }
    };
  }

  render() {
    if (this.state.control_connected) {
      console.log('the state5 is ', this.state.action)
      if (this.state.action === "take_picture")
        return (<CameraPage connection={this.ws} uuid={this.state.qr_text} control={this.values} action = {this.state.action}/>)
      else
        return (<CameraPage connection={this.ws} uuid={this.state.qr_text} control={this.values} action = {this.state.action}/>)

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