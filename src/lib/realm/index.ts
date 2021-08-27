import Realm from 'realm'
import PointSchema from './schemas/PointSchema'

const getRealm = () => {
  return Realm.open({
    path: 'LocationAppRealm',
    schema: [PointSchema],
    schemaVersion: 7,
  })
}

export default getRealm
