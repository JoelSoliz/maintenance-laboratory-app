import {Layout} from '@ui-kitten/components';
import {SimulationNavigator} from './simulation.navigator';

const Simulation = ({navigation}) => {
  return (
    <Layout style={{flex: 1}}>
      <SimulationNavigator />
    </Layout>
  );
};

export default Simulation;
