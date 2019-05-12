import React, { Component } from 'react';
import { Container, Header, Content, Button, Text, View } from 'native-base';
export default class ButtonRoundedExample extends Component {
  render() {
    return (

      <View style={{ flex: 1, position: 'relative', top: 350, alignItems: "center" }}>

          <Container>
            <Button rounded dark large>
              <Text> Control </Text>
            </Button>
            <Text>  </Text>
            <Button rounded large
            >
              <Text>   Scan   </Text>
            </Button>
          </Container>

      </View>

    );
  }
}