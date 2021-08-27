import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import NetInfo, {NetInfoStateType} from '@react-native-community/netinfo';
import {Alert, PermissionsAndroid, Platform} from 'react-native';
import {useAppContext} from '.';
import realmApi from '../services/realm';
import PointSchema from '../lib/realm/schemas/PointSchema';
import api from '../services/api';
import appConfig from '../config/appConfig';

interface ILocationContextData {
  changeNetwork: (value?: boolean) => void;
  isNetworkEnabled: boolean | null;
  isTracking: () => boolean;
  networkType?: NetInfoStateType;
  setNetworkType: (type: NetInfoStateType) => void;
  savePointInPackage: (point: PointSchema) => Promise<void>;
  packageList: PointSchema[];
  setPackageList: (points: PointSchema[]) => void;
  loadPoints: () => Promise<void>;
}

const LocationContext = createContext<ILocationContextData>(
  {} as ILocationContextData,
);

export const LocationProvider: React.FC = ({children}) => {
  const {
    intervalSelected,
    isServiceActivated,
    changeServiceStatus,
  } = useAppContext();

  const [isNetworkEnabled, setNetworkEnabled] = useState<boolean | null>(true);
  const [networkType, setNetworkType] = useState<NetInfoStateType>();
  const [packageList, setPackageList] = useState<PointSchema[]>([]);

  useEffect(() => {
    getPermissionLocation();
  }, []);

  useEffect(() => {
    checkNetworkConnection();
  }, []);

  useEffect(() => {
    loadPoints();
  }, []);

  useEffect(() => {
    synchronizePackage();
  }, []);

  const loadPoints = useCallback(async () => {
    const tempList = await realmApi.indexRealmPoints();
    setPackageList(tempList);
  }, [packageList]);

  const synchronizePackage = useCallback(async () => {
    setInterval(async () => {
      if (isNetworkEnabled) {
        const list = await realmApi.indexRealmPointsNoSynced();

        list.map(async item => {
          await api.createPackage(item);
          await realmApi.updateRealmPoint(item, true);
        });

        await loadPoints();
      }
    }, appConfig.synchronizeTime);
  }, []);

  const savePointInPackage = useCallback(async (point: PointSchema) => {
    const data = await realmApi.saveRealmPoint(point);
    setPackageList(oldValue => [data, ...oldValue]);
    await loadPoints();
  }, []);

  const checkNetworkConnection = useCallback(() => {
    setInterval(() => {
      NetInfo.fetch()
        .then(netInfo => {
          setNetworkType(netInfo.type);
          setNetworkEnabled(netInfo.isConnected);
        })
        .catch(console.debug);
    }, 3000);
  }, [networkType, isNetworkEnabled]);

  const changeNetwork = useCallback(
    (value?: boolean | null) => {
      setNetworkEnabled(oldValue => !!value || !oldValue);
    },
    [isNetworkEnabled],
  );

  const getPermissionLocation = useCallback(async () => {
    if (Platform.OS === 'android') {
      const permissionEnabled = await PermissionsAndroid.check(
        'android.permission.ACCESS_FINE_LOCATION',
      );

      if (!permissionEnabled) {
        PermissionsAndroid.requestPermission(
          'android.permission.ACCESS_FINE_LOCATION',
        )
          .then(granted => {
            if (!granted) {
              changeServiceStatus(false);
              Alert.alert(
                'Atenção',
                'O monitoramento permanecerá desativado até seja liberado o acesso a localização do telefone.',
              );
            }
          })
          .catch(console.debug);
      }
    }
  }, [isServiceActivated, intervalSelected]);

  const isTracking = useCallback(() => {
    return isServiceActivated && !!isNetworkEnabled;
  }, [isServiceActivated, isNetworkEnabled]);

  return (
    <LocationContext.Provider
      value={{
        changeNetwork,
        isNetworkEnabled,
        isTracking,
        networkType,
        setNetworkType,
        savePointInPackage,
        packageList,
        setPackageList,
        loadPoints,
      }}>
      {children}
    </LocationContext.Provider>
  );
};

export function useLocationContext(): ILocationContextData {
  const context = useContext(LocationContext);

  if (!context) {
    throw new Error('useLocationContext is not inside an LocationContext.');
  }

  return context;
}
