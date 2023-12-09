import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../views/home/home';
import Policies from '../views/policies/policies';
import Simulation from '../views/simulation/simulation';

const Stack = createStackNavigator();

const MainStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="home"
      component={Home}
      options={{title: 'Inicio', headerShown: false}}
    />
    <Stack.Screen
      name="policies"
      component={Policies}
      options={{title: 'Politicas guardadas'}}
    />
    <Stack.Screen
      name="simulation"
      component={Simulation}
      options={{title: 'Simulación'}}
    />
  </Stack.Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <MainStack />
  </NavigationContainer>
);
