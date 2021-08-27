import React, {useEffect} from 'react';
import Divider from '../../components/Divider';
import {
  StatusContainer,
  PackageFlatlist,
  PackageItem,
  PackageTextView,
  PackageID,
  PackageStatus,
  TimeText,
} from './styles';
import {useLocationContext} from '../../hooks/location';
import formatDateFromString from '../../utils/formatDateFromString';
import FormatDateEnum from '../../config/formatDateEnum';
import PointSchema from '../../lib/realm/schemas/PointSchema';

const Status = () => {
  const {packageList, loadPoints} = useLocationContext();

  useEffect(() => {
    loadPoints();
  }, []);

  return (
    <StatusContainer>
      <PackageFlatlist
        data={packageList}
        keyExtractor={() => String(Math.random())}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <React.Fragment key={index}>
            <Divider />
            <PackageItem>
              <PackageTextView>
                <PackageID>Pacote ID: {(item as PointSchema).id}</PackageID>
                <PackageStatus>
                  {(item as PointSchema).synced
                    ? 'Sincronizado'
                    : 'Pendente sincronizar'}
                </PackageStatus>
              </PackageTextView>
              <TimeText>
                {formatDateFromString(
                  (item as PointSchema).createdAt,
                  FormatDateEnum.HH_MM,
                )}
              </TimeText>
            </PackageItem>
            <Divider />
          </React.Fragment>
        )}
      />
    </StatusContainer>
  );
};

export default Status;
