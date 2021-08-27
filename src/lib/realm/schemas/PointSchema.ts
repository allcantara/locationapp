import SchemaEnum from '../../../config/SchemaEnum';
import generateID from '../../../utils/generateId';

class PointSchema {
  public id: string = generateID();
  public latitude: number = 0;
  public longitude: number = 0;
  public speed: number = 0;
  public time: string = '';
  public synced: boolean = false;
  public createdAt: Date = new Date();

  public static schema: Realm.ObjectSchema = {
    name: SchemaEnum.POINT,
    primaryKey: 'id',
    properties: {
      id: 'string',
      latitude: 'double',
      longitude: 'double',
      speed: 'int',
      time: 'string',
      synced: 'bool',
      createdAt: 'date',
    },
  };
}

export default PointSchema;
