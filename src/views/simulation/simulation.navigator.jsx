import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from '@ui-kitten/components';
import SimulationResult from './simulation-results';
import SimulationGraphs from './simulation-graphs';

const {Navigator, Screen} = createBottomTabNavigator();

const ResultIcon = props => <Icon {...props} name="checkmark-square-outline" />;
const GraphIcon = props => <Icon {...props} name="pie-chart-outline" />;

const BottomTabBar = ({navigation, state}) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab title="RESULTADO" icon={ResultIcon} />
    <BottomNavigationTab title="GRAFICOS" icon={GraphIcon} />
  </BottomNavigation>
);

export const SimulationNavigator = () => (
  <Navigator tabBar={props => <BottomTabBar {...props} />}>
    <Screen
      name="result"
      component={SimulationResult}
      options={{headerShown: false}}
    />
    <Screen
      name="graph"
      component={SimulationGraphs}
      options={{headerShown: false}}
    />
  </Navigator>
);
