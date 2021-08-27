import React, {useCallback, useState, useEffect} from 'react';

import Geolocation, {
  GeolocationOptions,
  GeolocationResponse,
  GeolocationError,
} from '@react-native-community/geolocation';

import {useAppContext} from '../../hooks';
import Switch from '../../components/Switch';
import {useLocationContext} from '../../hooks/location';
import FormatDateEnum from '../../config/formatDateEnum';
import formatDateFromString from '../../utils/formatDateFromString';

import {StatusContainer, StatusTextContainer, Title, Status} from './styles';
import generateID from '../../utils/generateId';

const ServiceStatus = () => {
  const {
    isServiceActivated,
    intervalSelected,
    changeServiceStatus,
  } = useAppContext();

  const {isNetworkEnabled, savePointInPackage} = useLocationContext();

  const [watchInterval, setWatchInterval] = useState<number | null>(
    intervalSelected,
  );

  useEffect(() => {
    clearWatchPosition();
    initWatchPosition();
  }, [intervalSelected, isServiceActivated]);

  const handleActivateService = useCallback(() => {
    changeServiceStatus();
    clearWatchPosition();
    if (isServiceActivated) {
      initWatchPosition();
    }
  }, [isServiceActivated]);

  const initWatchPosition = useCallback(() => {
    const interval = setInterval(() => {
      if (isServiceActivated) {
        loadPosition();
      } else {
        clearWatchPosition();
      }
    }, intervalSelected * 1000);

    setWatchInterval(interval);
  }, [isServiceActivated, watchInterval, intervalSelected]);

  const clearWatchPosition = useCallback(() => {
    if (watchInterval) {
      clearInterval(watchInterval);
      setWatchInterval(null);
    }
  }, [intervalSelected, watchInterval, isServiceActivated]);

  const loadPosition = useCallback(async () => {
    const options: GeolocationOptions = {
      enableHighAccuracy: !isNetworkEnabled ? true : false,
      timeout: 20000,
      maximumAge: 0,
      distanceFilter: 0,
      useSignificantChanges: true,
    };

    Geolocation.getCurrentPosition(handleCoords, handleError, options);
  }, [intervalSelected, isServiceActivated, isNetworkEnabled]);

  const handleCoords = useCallback(
    ({coords: {latitude, longitude, speed}}: GeolocationResponse) => {
      const date = new Date();

      const pointData = {
        latitude,
        longitude,
        synced: false,
        createdAt: date,
        id: generateID(),
        speed: Number(speed),
        time: formatDateFromString(date, FormatDateEnum.YYYY_MM_DD),
      };

      savePointInPackage(pointData).then().catch(console.debug);
    },
    [isServiceActivated],
  );

  const handleError = useCallback((error: GeolocationError) => {
    console.debug(error.message);
  }, []);

  return (
    <StatusContainer>
      <StatusTextContainer>
        <Title>Status do serviço</Title>
        <Status>
          {isServiceActivated ? 'Serviço ativo' : 'Serviço inativo'}
        </Status>
      </StatusTextContainer>
      <Switch
        isEnabled={isServiceActivated}
        toggleSwitch={handleActivateService}
      />
    </StatusContainer>
  );
};

export default ServiceStatus;
