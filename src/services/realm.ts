import getRealm from '../lib/realm';
import SchemaEnum from '../config/SchemaEnum';
import PointSchema from '../lib/realm/schemas/PointSchema';

const saveRealmPoint = async (data: PointSchema) => {
  const realm = await getRealm();
  realm.write(() => {
    data = realm.create<PointSchema>(SchemaEnum.POINT, data);
  });
  return data as PointSchema;
};

const deleteRealmPoint = async (data: PointSchema) => {
  const realm = await getRealm();
  realm.write(() => {
    const point = realm
      .objects<PointSchema[]>(SchemaEnum.POINT)
      .filtered(`id = '${data.id}'`)[0];

    realm.delete(point);
  });
};

const indexRealmPoints = async () => {
  const realm = await getRealm();
  const packages = realm
    .objects<PointSchema[]>(SchemaEnum.POINT)
    .sorted('time', true);

  return (packages as unknown) as PointSchema[];
};

const indexRealmPointsNoSynced = async () => {
  const realm = await getRealm();
  const packages = realm
    .objects<PointSchema[]>(SchemaEnum.POINT)
    .sorted('time', true)
    .filtered('synced = false')

  return (packages as unknown) as PointSchema[];
};

const updateRealmPoint = async (point: PointSchema, synced: boolean) => {
  const realm = await getRealm();
  realm.write(() => {
    const data = realm
      .objects<PointSchema>(SchemaEnum.POINT)
      .filtered(`id = '${point.id}'`)[0];

    data.synced = synced;
    point = data;
  });

  return point;
};

const realmApi =  {
  saveRealmPoint,
  updateRealmPoint,
  indexRealmPointsNoSynced,
  indexRealmPoints,
  deleteRealmPoint,
};

export default realmApi;
