/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, Alert, Button} from 'react-native';
import codePush from 'react-native-code-push';
import Repolist from './Repolist';

const App: React.FC = () => {
  const [updatedAvailable, setUpdatedAvailable] = useState(false);
  const [loading, setLoading] = useState(false);

  const onButtonPress = () => {
    // setLoading(true);
    // codePush.sync({
    //   updateDialog: {
    //     title: 'teste',
    //   },
    //   installMode: codePush.InstallMode.IMMEDIATE,
    // });
    // setLoading(false);
  };

  const check = useCallback(async () => {
    try {
      const result = await codePush.checkForUpdate();

      if (result) {
        Alert.alert(
          'Atualização disponivel',
          'Você precisa atualizar para versão mais recente do app',
          [
            {
              text: 'Atualizar',
              onPress: async () => {
                setLoading(true);
                const localPackage = await result?.download();

                await codePush.notifyAppReady();
                if (localPackage) {
                  localPackage.install(codePush.InstallMode.IMMEDIATE);
                }
              },
            },
          ],
        );
        setUpdatedAvailable(true);
      } else {
        setUpdatedAvailable(false);
      }
    } catch (error: any) {
      Alert.alert('err', error.message);
    }
  }, []);

  useEffect(() => {
    check();
  }, [check]);

  useEffect(() => {
    return () => setLoading(false);
  }, []);

  return (
    <>
      {updatedAvailable && (
        <Button
          onPress={onButtonPress}
          title="NOVA VERSÃO DISPONIVEL"
          disabled
        />
      )}
      {loading ? (
        <ActivityIndicator style={{flex: 1, alignItems: 'center'}} />
      ) : (
        <Repolist />
      )}
    </>
  );
};

export default codePush({
  checkFrequency: codePush.CheckFrequency.MANUAL,
})(App);
