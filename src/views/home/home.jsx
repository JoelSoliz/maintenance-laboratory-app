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
import {usePoliciesStore} from '../../store/context';
import {savePolicy} from '../../store/firebase';
import {formatDateToString} from '../../utilities/file';

const useInputState = (initialValue = '') => {
  const [value, setValue] = React.useState(initialValue);
  return {value, onChangeText: setValue};
};

const Home = ({navigation}) => {
  const setPolicy1 = usePoliciesStore(state => state.setPolicy1);
  const setPolicy2 = usePoliciesStore(state => state.setPolicy2);
  const userID = usePoliciesStore(state => state.userID);

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
              if (userID) {
                savePolicy({
                  policy1,
                  policy2,
                  name: formatDateToString(new Date()),
                  userID,
                });
              }
              navigation.navigate('simulation');
            }}
            style={styles.button}>
            Simular
          </Button>
          <Button
            onPress={() => {
              navigation.navigate('policies');
              console.log('policiesss');
            }}
            style={{...styles.button, marginTop: 10}}>
            Ver politicas guardadas
          </Button>
        </View>

        <View style={{marginTop: 20, marginHorizontal: 10}}>
          <Text category="h4" style={{textAlign: 'center'}}>
            ¡Bienvenido al caso de estudio del Laboratorio de Mantenimiento!
          </Text>
          <Text category="s1">
            Esta herramienta ha sido diseñada para ayudarte a tomar decisiones
            informadas en el contexto del caso de estudio del Laboratorio de
            Mantenimiento.
          </Text>
          <Text category="h5">Desafío:</Text>
          <Text category="s1">
            Nos encontramos ante un desafío de mantenimiento en el cual ciertos
            equipos, que contienen 4 componentes electrónicos idénticos,
            experimentan fallas frecuentes, resultando en desconexiones del
            equipo durante la reposición.
          </Text>
          <Text category="h5">Cómo Funciona:</Text>
          <Text category="s1">
            * El programa utiliza la distribución normal acumulativa para
            simular el tiempo de vida de los componentes. Esto permite capturar
            la variabilidad en el desgaste de los componentes, considerando la
            media y la desviación estándar
          </Text>
          <Text category="s1">
            * Mediante la simulación, el programa modela la operación del equipo
            durante “Ejemplo (20,000 horas)” bajo dos políticas de reposición:
            reemplazo individual cuando falla un componente y reemplazo
            simultáneo de los cuatro componentes al fallar cualquiera de ellos.
          </Text>
          <Text category="s1">
            * El programa calcula los costos asociados con cada política,
            considerando el costo de los nuevos componentes, el costo por hora
            de desconexión y la duración de la desconexión (1 hora para
            reemplazo individual, 2 horas para reemplazo simultáneo).
          </Text>
          <Text category="s1">
            * Se realiza un análisis comparativo de los costos acumulativos bajo
            ambas políticas para determinar cuál es más económica y eficiente.
          </Text>
          <Text category="h5">Políticas de Inventario a Evaluar:</Text>
          <Text category="s1">
            * Politica 1: Reemplazar los componentes cuando fallecen
            individualmente .
          </Text>
          <Text category="s1">
            * Politica 2: Reemplazar todos los componentes al mismo tiempo.
          </Text>
          <Text category="s1" status="info" style={{fontWeight: 'bold'}}>
            El objetivo es determinar cuál de las dos políticas de reposición es
            más económica y eficiente
          </Text>
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
