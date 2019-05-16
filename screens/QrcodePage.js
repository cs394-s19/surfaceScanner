import React, { Component } from 'react'
import QRCode from 'react-native-qrcode';
import { NetworkInfo } from 'react-native-network-info';
import {
  AppRegistry,
  StyleSheet,
  View,
  TextInput
} from 'react-native';
import {Button, Container, Text} from "native-base";



export default class QrcodePage extends React.Component{

  constructor(props) {

    // console.log('context',context)
    super(props);

    this.state = {
      text: "192.168.0.1",
    };
  }





  render() {
    // let ip = NetworkInfo.getIPAddress();
    // console.log(ip)
    return (


      <View style={{ flex: 1, alignItems: "center" }}>
  <Container>
    <QRCode
    value={this.state.text}
    size={200}
    bgColor='black'
    fgColor='white'/>

      </Container>


      </View>

  );
  };
}