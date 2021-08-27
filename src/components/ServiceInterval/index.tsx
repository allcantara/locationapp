import React, {useCallback, useEffect} from 'react';
import {Title, IntervalContainer, IntervalButtonContainer} from './styles';
import IntervalButton from '../../components/IntervalButton';
import {useAppContext} from '../../hooks';
import appConfig from '../../config/appConfig';

const ServiceInterval = () => {
  const {intervalSelected, selectInterval, getAsyncStorage} = useAppContext();

  const handleIntervalSelect = useCallback(
    (interval: number) => {
      selectInterval(interval);
    },
    [intervalSelected],
  );

  return (
    <IntervalContainer>
      <Title>Intervalo de comunicação</Title>
      <IntervalButtonContainer>
        {[10, 5, 3, 1].map((interval, key) => (
          <IntervalButton
            key={key}
            title={`${interval}s`}
            onPress={() => handleIntervalSelect(interval)}
            active={intervalSelected === interval}
          />
        ))}
      </IntervalButtonContainer>
    </IntervalContainer>
  );
};

export default ServiceInterval;
