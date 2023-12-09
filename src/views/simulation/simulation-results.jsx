import React from 'react';
import {ScrollView, View} from 'react-native';
import {Button, Icon, Layout, Spinner, Text} from '@ui-kitten/components';
import {usePoliciesStore} from '../../store/context';
import {createExcelFile} from '../../utilities/file';
import {generateTextResult} from '../../utilities/generator';

const DownloadIcon = props => <Icon {...props} name="download-outline" />;
const LoadingIndicator = props => (
  <View
    style={{
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <Spinner size="small" />
  </View>
);

const SimulationResult = () => {
  const [downloading1, setDownloading1] = React.useState(false);
  const [downloading2, setDownloading2] = React.useState(false);
  const policy1 = usePoliciesStore(state => state.policy1);
  const policy2 = usePoliciesStore(state => state.policy2);
  const date = usePoliciesStore(state => state.date);
  let better =
    policy1.cumulativeCost > policy2.cumulativeCost
      ? 'Politica 2'
      : 'Politica 1';

  return (
    <ScrollView>
      <Layout
        style={{flex: 1, justifyContent: 'center', paddingHorizontal: 40}}>
        <Text category="h1" style={{textAlign: 'center'}}>
          Resultado
        </Text>
        <Layout style={{marginTop: 30}}>
          <Text category="h6" status="info">
            Costo de la política 1: {policy1.cumulativeCost} [Bs] /{' '}
            {policy1.totalTime} [hrs]
          </Text>
          <Text category="h6" status="info">
            Costo de la política 2: {policy2.cumulativeCost} [Bs] /{' '}
            {policy2.totalTime} [hrs]
          </Text>
          <Text category="h4" style={{marginTop: 10}}>
            La política mas económica es:
          </Text>
          <Text category="h4" status="success" style={{textAlign: 'center'}}>
            {better}
          </Text>
          <Text category="s1" status="info" style={{marginTop: 10}}>
            {generateTextResult(policy1, policy2)}
          </Text>
          <Layout
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              margin: 50,
            }}>
            <Button
              accessoryRight={downloading1 ? LoadingIndicator : DownloadIcon}
              disabled={downloading1 || downloading2}
              onPress={() => {
                setDownloading1(true);
                createExcelFile(policy1.config, policy1.events, date);
                setDownloading1(false);
              }}
              style={{marginBottom: 10}}>
              Informe Política 1
            </Button>
            <Button
              accessoryRight={downloading2 ? LoadingIndicator : DownloadIcon}
              disabled={downloading1 || downloading2}
              onPress={() => {
                setDownloading2(true);
                createExcelFile(policy2.config, policy2.events, date);
                setDownloading2(false);
              }}>
              Informe Política 2
            </Button>
          </Layout>
        </Layout>
      </Layout>
    </ScrollView>
  );
};

export default SimulationResult;
