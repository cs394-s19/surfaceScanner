import SliderPage from './screens/SliderPage';
import ControlScanScreen from './screens/ControlScanScreen';
import QRCodePage from './screens/QRCodePage';
import ScanInstru from './screens/ScanInstru';
import CameraPage from './screens/CameraPage';
import { createStackNavigator, createAppContainer } from 'react-navigation';

const AppNavigator = createStackNavigator({
  Home: {
    screen: ControlScanScreen
  },
  SliderPage: {
    screen: SliderPage
  },
  QRCodePage: {
    screen: QRCodePage
  },
  CameraPage: {
    screen: CameraPage
  },
  ScanInstru:{
    screen: ScanInstru
  }

});

export default createAppContainer(AppNavigator);