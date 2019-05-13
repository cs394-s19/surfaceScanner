import React, { Component } from 'react';
import { Container, Header, Content, Button, Text, View } from 'native-base';;
import SliderPage from './screens/SliderPage';
import ControlScanScreen from './screens/ControlScanScreen';
import {createStackNavigator, createAppContainer} from 'react-navigation';


// export default class ButtonRoundedExample extends Component {
//   static navigationOptions = {
//     title: 'Welcome',
//   };
//
//   render() {
//     const {navigate} = this.props.navigation;
//     return (
//
//       <View style={{ flex: 1, position: 'relative', top: 350, alignItems: "center" }}>
//           <Container>
//             <Button rounded dark large onPress={() => navigate('Slider')}>
//               <Text> Control </Text>
//             </Button>
//             <Text>  </Text>
//             <Button rounded large onPress={() => navigate('Slider')}>
//               <Text>   Scan   </Text>
//             </Button>
//           </Container>
//
//       </View>
//
//     );
//   }
// }

const AppNavigator = createStackNavigator({
  Home: {
    screen: ControlScanScreen
  },
  SliderPage: {
    screen: SliderPage
  }
});

export default createAppContainer(AppNavigator);