import {useState, useEffect} from 'react';
import {Alert, View} from 'react-native';
import {collection, getDocs} from 'firebase/firestore';
import {
  Button,
  Divider,
  Input,
  List,
  ListItem,
  Text,
} from '@ui-kitten/components';
import database from '../../store/database';
import {usePoliciesStore} from '../../store/context';

const useInputState = (initialValue = '') => {
  const [value, setValue] = useState(initialValue);
  return {value, onChangeText: setValue};
};

const Policies = ({navigation}) => {
  const _userID = usePoliciesStore(state => state.userID);
  const setUserID = usePoliciesStore(state => state.setUserID);
  const setPolicy1 = usePoliciesStore(state => state.setPolicy1);
  const setPolicy2 = usePoliciesStore(state => state.setPolicy2);
  const setDate = usePoliciesStore(state => state.setDate);
  const lUserID = useInputState(_userID);
  const [data, setData] = useState();

  useEffect(() => {
    const getPolicies = async () => {
      try {
        const query = await getDocs(collection(database, 'policies-by-user'));
        const docs = [];
        query.forEach(doc => {
          const {policy1, policy2, name, userID} = doc.data();
          if (userID === _userID) {
            docs.push({policy1, policy2, title: name, id: doc.id});
          }
        });
        console.log(docs);
        setData(docs);
      } catch (error) {
        console.error(error);
      }
    };

    getPolicies();

    return () => {};
  }, [_userID]);

  const renderItem = ({item, index}) => (
    <ListItem
      title={`Política generada ${item.title}`}
      description={item?.description ?? ''}
      onPress={() => {
        setPolicy1(item.policy1);
        setPolicy2(item.policy2);
        setDate(item.name);
        navigation.navigate('simulation');
      }}
    />
  );

  return (
    <View style={{flex: 1, padding: 20}}>
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          gap: 10,
        }}>
        <Input placeholder="Inserte su usuario" {...lUserID} />
        <Button
          onPress={() => {
            setUserID(lUserID.value);
            Alert.alert('Usuario cambiado!');
          }}>
          Cambiar usuario
        </Button>
      </View>
      <View>
        <Text category="h3">Politicas</Text>
        <List
          style={{}}
          data={data}
          ItemSeparatorComponent={Divider}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

export default Policies;
