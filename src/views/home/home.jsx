import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  Button,
  CheckBox,
  Divider,
  Input,
  Layout,
  Text,
} from '@ui-kitten/components';
import {generatePolicy1, generatePolicy2} from '../../utilities/generator';
import {usePoliciesStore} from '../../utilities/context';

const useInputState = (initialValue = '') => {
  const [value, setValue] = React.useState(initialValue);
  return {value, onChangeText: setValue};
};

const Home = ({navigation}) => {
  const setPolicy1 = usePoliciesStore(state => state.setPolicy1);
  const setPolicy2 = usePoliciesStore(state => state.setPolicy2);

  const mean = useInputState();
  const deviation = useInputState();
  const costComponent = useInputState();
  const costDisconnect = useInputState();
  const totalTime = useInputState('20000');
  const timeDisconnect1 = useInputState('1');
  const timeDisconnect2 = useInputState('2');
  const advanced = useInputState(false);

  return (
    <Layout style={styles.container}>
      <ScrollView>
        <View style={styles.centered}>
          <Text category="h4">Simulación mantenimiento de Laboratorio:</Text>
        </View>
        <View style={{marginTop: 30, paddingHorizontal: 30}}>
          <Input
            label="Media"
            placeholder="Inserte el valor"
            {...mean}
            keyboardType="numeric"
            style={styles.input}
          />
          <Input
            label="Desviación Estándar"
            placeholder="Inserte el valor"
            {...deviation}
            keyboardType="numeric"
            style={styles.input}
          />
          <Input
            label="Costo por componente"
            placeholder="Inserte el valor"
            {...costComponent}
            keyboardType="numeric"
            style={styles.input}
          />
          <Input
            label="Costo por desconexión/hora"
            placeholder="Inserte el valor"
            {...costDisconnect}
            keyboardType="numeric"
            style={styles.input}
          />
          <CheckBox
            checked={advanced.value}
            onChange={advanced.onChangeText}
            style={styles.checkbox}>
            Configuración avanzada
          </CheckBox>
          {advanced.value && (
            <>
              <View style={{paddingVertical: 10}}>
                <Divider style={{height: 3}} />
              </View>
              <Input
                label="Tiempo total simulación"
                placeholder="Inserte el valor"
                {...totalTime}
                keyboardType="numeric"
                style={styles.input}
              />
              <Input
                label="Tiempo de desconexión politica 1"
                placeholder="Inserte el valor"
                {...timeDisconnect1}
                keyboardType="numeric"
                style={styles.input}
              />
              <Input
                label="Tiempo de desconexión politica 2"
                placeholder="Inserte el valor"
                {...timeDisconnect2}
                keyboardType="numeric"
                style={styles.input}
              />
            </>
          )}
        </View>
        <View style={styles.centered}>
          <Button
            onPress={() => {
              let policy1 = generatePolicy1({
                mean: parseFloat(mean.value),
                deviation: parseFloat(deviation.value),
                costComponent: parseFloat(costComponent.value),
                costDisconnect: parseFloat(costDisconnect.value),
                timeDisconnect: parseInt(timeDisconnect1.value),
                totalTime: parseInt(totalTime.value),
              });
              setPolicy1(policy1);
              let policy2 = generatePolicy2({
                mean: parseFloat(mean.value),
                deviation: parseFloat(deviation.value),
                costComponent: parseFloat(costComponent.value),
                costDisconnect: parseFloat(costDisconnect.value),
                timeDisconnect: parseInt(timeDisconnect2.value),
                totalTime: parseInt(totalTime.value),
              });
              setPolicy2(policy2);
              navigation.navigate('simulation');
            }}
            style={styles.button}>
            Simular
          </Button>
        </View>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 30,
    width: 200,
  },
  centered: {
    alignItems: 'center',
  },
  checkbox: {
    paddingVertical: 5,
  },
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    paddingBottom: 10,
  },
});

export default Home;
