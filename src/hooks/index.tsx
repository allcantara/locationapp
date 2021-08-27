import React, {createContext, useContext, useState, useCallback, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import appConfig from '../config/appConfig';
import {LocationProvider} from './location';

interface IAppContextData {
  intervalSelected: number;
  selectInterval: (interval: number) => void;
  isServiceActivated: boolean;
  changeServiceStatus: (value?: boolean) => void;
  getAsyncStorage: (enviromentName: string) => Promise<string | null>;
  setAsyncStorage: (enviromentName: string, data: unknown) => Promise<void>;
}

const AppContext = createContext<IAppContextData>({} as IAppContextData);

export const AppProvider: React.FC = ({children}) => {
  const [intervalSelected, setIntervalSelected] = useState<number>(10);
  const [isServiceActivated, setServiceActivated] = React.useState(false);

  useEffect(() => {
    const loadAsyncStorageData = async () => {
      const interval = await getAsyncStorage(appConfig.asyncStorage.interval)
      interval && setIntervalSelected(Number(interval))
    }

    loadAsyncStorageData()
  }, [])

  const selectInterval = useCallback(
    (interval: number) => {
      setIntervalSelected(interval);
      setAsyncStorage(appConfig.asyncStorage.interval, interval).then();
    },
    [intervalSelected],
  );

  const changeServiceStatus = useCallback(
    (value?: boolean) => {
      setServiceActivated(oldValue => value != undefined ? value : !oldValue);
      setAsyncStorage(appConfig.asyncStorage.statusService, isServiceActivated).then();
    },
    [isServiceActivated],
  );

  const setAsyncStorage = useCallback(
    async (enviromentName: string, data: unknown) => {
      await AsyncStorage.setItem(enviromentName, JSON.stringify(data));
    },
    [],
  );

  const getAsyncStorage = useCallback(async (enviromentName: string) => {
    return await AsyncStorage.getItem(enviromentName);
  }, []);

  return (
    <AppContext.Provider
      value={{
        intervalSelected,
        selectInterval,
        isServiceActivated,
        changeServiceStatus,
        getAsyncStorage,
        setAsyncStorage,
      }}>
      <LocationProvider>{children}</LocationProvider>
    </AppContext.Provider>
  );
};

export function useAppContext(): IAppContextData {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useGlobal is not inside an AppContext.');
  }

  return context;
}
