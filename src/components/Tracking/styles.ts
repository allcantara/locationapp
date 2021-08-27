import styled from 'styled-components/native'
import NetworkStatusEnum from '../../config/networkStatusEnum'
import stylesConfig from '../../config/stylesConfig'

interface ITrackingStatus {
  status: boolean
}

export const TrackingContainer = styled.View`
  flex-direction: row;
  padding: 22px ${stylesConfig.paddingHorizontal};
  border-bottom-color: ${stylesConfig.colorGray4};
  align-items: center;
  border-bottom-width: 1.5px;
`

export const TrackingTextContainer = styled.View`
  padding: 0 18px;
`

export const TrackingTitle = styled.Text`
  color: ${stylesConfig.colorDark};
  font-weight: bold;
  font-size: 20px;
`

export const TrackingStatus = styled.Text<ITrackingStatus>`
  color: ${props => props.status ? stylesConfig.colorGreen : stylesConfig.colorGray2};
  font-style: italic;
  font-size: 16px;
`
