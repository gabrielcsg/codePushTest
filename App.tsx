import React, {useEffect, useState} from 'react';
import {Alert, Button} from 'react-native';
import codePush from 'react-native-code-push';
import Repolist from './Repolist';

const App: React.FC = () => {
  const [updatedAvailable, setUpdatedAvailable] = useState(true);

  const onButtonPress = () => {
    codePush.sync({
      updateDialog: {
        title: 'teste',
      },
      installMode: codePush.InstallMode.IMMEDIATE,
    });
  };

  const check = async () => {
    try {
      const result = await codePush.checkForUpdate();

      Alert.alert('resultado', String(result?.isPending));
    } catch (error: any) {
      Alert.alert('err', error.message);
    }
  };

  useEffect(() => {
    check();
  }, []);

  return (
    <>
      <Button onPress={onButtonPress} title="atualizar" />
      <Repolist />
    </>
  );
};

export default codePush({
  checkFrequency: codePush.CheckFrequency.MANUAL,
})(App);
