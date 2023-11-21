import {AppRegistry} from 'react-native';
import App from './src/app/app-with-splash';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
