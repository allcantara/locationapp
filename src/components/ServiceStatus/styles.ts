import styled from 'styled-components/native'
import stylesConfig from '../../config/stylesConfig'

export const StatusContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 26px ${stylesConfig.paddingHorizontal};
`

export const StatusTextContainer = styled.View`
  justify-content: center;
`

export const Status = styled.Text`
  color: ${stylesConfig.colorDark2};
  font-size: 14px;
  margin-top: 4px;
`

export const Title = styled.Text`
  color: ${stylesConfig.colorDark};
  font-size: 20px;
`
