import SliderPage from './screens/SliderPage';
import ControlScanScreen from './screens/ControlScanScreen';
import QRCodePage from './screens/QRCodePage';
import ScanInstru from './screens/ScanInstru';
import ScanInstru1 from './screens/ScanInstru1';
import ScanInstru2 from './screens/ScanInstru2';
import CameraPage from './screens/CameraPage';
import PresentPage from './screens/PresentPage';
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
  },
  ScanInstru1:{
    screen: ScanInstru1
  },
  ScanInstru2:{
    screen: ScanInstru2
  },
  PresentPage:{
    screen: PresentPage
  }
});

export default createAppContainer(AppNavigator);