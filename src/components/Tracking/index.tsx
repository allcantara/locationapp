import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import stylesConfig from '../../config/stylesConfig';

import {
  TrackingContainer,
  TrackingTextContainer,
  TrackingTitle,
  TrackingStatus,
} from './styles';
import {useLocationContext} from '../../hooks/location';

const Tracking = () => {
  const {isTracking, isNetworkEnabled} = useLocationContext();

  return (
    <TrackingContainer>
      <Feather
        name="compass"
        color={stylesConfig.headerBackgroundColor}
        size={60}
      />
      <TrackingTextContainer>
        <TrackingTitle>
          My GPS - {isTracking() ? 'Tracking' : 'No tracking'}
        </TrackingTitle>
        <TrackingStatus status={!!isNetworkEnabled}>
          {!!isNetworkEnabled ? 'Online' : 'Offline'}
        </TrackingStatus>
      </TrackingTextContainer>
    </TrackingContainer>
  );
};

export default Tracking;
