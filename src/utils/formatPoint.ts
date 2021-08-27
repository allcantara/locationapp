import FormatDateEnum from '../config/formatDateEnum';
import IPoint from '../interfaces/IPoint';
import {IPointRealm} from '../lib/realm/schemas/PointSchema';
import formatDateFromString from './formatDateFromString';

const formatFromSave = ({
  id,
  latitude,
  longitude,
  speed,
  time,
}: IPointRealm) => {
  return ({
    id,
    latitude,
    longitude,
    speed,
    time: formatDateFromString(time, FormatDateEnum.YYYY_MM_DD),
  } as unknown) as IPoint;
};

const formatFromSaveInRealm = ({id, latitude, longitude, speed}: IPoint) => {
  return ({
    id,
    latitude,
    longitude,
    speed,
    time: new Date(),
    synced: false,
  } as unknown) as IPointRealm;
};

const formatFromVisualize = ({
  id,
  latitude,
  longitude,
  speed,
  synced,
  time,
}: IPointRealm) => {
  return {
    id,
    latitude,
    longitude,
    speed,
    synced,
    time: formatDateFromString(time, FormatDateEnum.HH_MM),
  };
};

export {formatFromSave, formatFromSaveInRealm, formatFromVisualize};
