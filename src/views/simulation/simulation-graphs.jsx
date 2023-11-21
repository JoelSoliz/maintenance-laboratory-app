import {ScrollView} from 'react-native';
import {PieChart} from 'react-native-chart-kit';
import {Icon, Layout, Text} from '@ui-kitten/components';
import {usePoliciesStore} from '../../utilities/context';

const LabelIcon = ({color, size}) => {
  return (
    <Icon
      name="radio-button-on"
      fill={color}
      style={{height: size, width: size}}
    />
  );
};

const costData = policy => [
  {
    name: 'Costo de componentes',
    population: policy.component.cost,
    color: '#f07f31',
    legendFontColor: '#002054',
    legendFontSize: 14,
    u: ' [Bs]',
  },
  {
    name: 'Costo de desconexión',
    population: policy.disconnection.cost,
    color: '#4371c4',
    legendFontColor: '#002054',
    legendFontSize: 14,
    u: ' [Bs]',
  },
];

const disconnectHoursData = (policy1, policy2) => [
  {
    name: 'Política 1',
    population: policy1.disconnection.time,
    color: '#f07f31',
    legendFontColor: '#002054',
    legendFontSize: 14,
    u: ' [hrs]',
  },
  {
    name: 'Política 2',
    population: policy2.disconnection.time,
    color: '#4371c4',
    legendFontColor: '#002054',
    legendFontSize: 14,
    u: ' [hrs]',
  },
];

const disconnectQuantityData = (policy1, policy2) => [
  {
    name: 'Política 1',
    population: policy1.disconnection.total,
    color: '#f07f31',
    legendFontColor: '#002054',
    legendFontSize: 14,
    u: '',
  },
  {
    name: 'Política 2',
    population: policy2.disconnection.total,
    color: '#4371c4',
    legendFontColor: '#002054',
    legendFontSize: 14,
    u: '',
  },
];

const componentsQuantityData = (policy1, policy2) => [
  {
    name: 'Política 1',
    population: policy1.component.total,
    color: '#f07f31',
    legendFontColor: '#002054',
    legendFontSize: 14,
    u: '',
  },
  {
    name: 'Política 2',
    population: policy2.component.total,
    color: '#4371c4',
    legendFontColor: '#002054',
    legendFontSize: 14,
    u: '',
  },
];

const Graph = ({title, data}) => {
  return (
    <Layout>
      <Text category="h4">{title}</Text>
      <Layout
        style={{
          alignItems: 'center',
        }}>
        <Layout>
          <PieChart
            data={data}
            width={200}
            height={200}
            chartConfig={{
              backgroundColor: '#1cc910',
              backgroundGradientFrom: '#eff3ff',
              backgroundGradientTo: '#efefef',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
                marginLeft: 20,
              },
            }}
            style={{
              borderRadius: 16,
            }}
            paddingLeft="30"
            accessor="population"
            backgroundColor="transparent"
            hasLegend={false}
          />
        </Layout>
        <Layout
          style={{
            flex: 1,
            justifyContent: 'center',
            marginLeft: -30,
            marginTop: -10,
            marginBottom: 20,
          }}>
          {data.map(item => (
            <Layout
              key={item.name}
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
              }}>
              <LabelIcon color={item.color} size={item.legendFontSize} />
              <Text style={{color: item.legendFontColor}}>
                {item.name} ({item.population}
                {item.u})
              </Text>
            </Layout>
          ))}
        </Layout>
        {/* </Layout> */}
      </Layout>
    </Layout>
  );
};

const SimulationGraphs = () => {
  const policy1 = usePoliciesStore(state => state.policy1);
  const policy2 = usePoliciesStore(state => state.policy2);

  return (
    <ScrollView>
      <Layout style={{flex: 1, paddingHorizontal: 20}}>
        <Text category="h1" style={{textAlign: 'center'}}>
          Gráficos
        </Text>
        <Graph
          title="Distribución de costo - Política 1"
          data={costData(policy1)}
        />
        <Graph
          title="Distribución de costo - Política 2"
          data={costData(policy2)}
        />
        <Graph
          title="Cantidad de desconexiones por política"
          data={disconnectQuantityData(policy1, policy2)}
        />
        <Graph
          title="Cantidad de componentes usados por política"
          data={componentsQuantityData(policy1, policy2)}
        />
        <Graph
          title="Cantidad de tiempo de desconexión por política"
          data={disconnectHoursData(policy1, policy2)}
        />
      </Layout>
    </ScrollView>
  );
};

export default SimulationGraphs;
