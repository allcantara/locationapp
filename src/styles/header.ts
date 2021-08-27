import styled from 'styled-components/native'
import stylesConfig from '../config/stylesConfig'

export const Text = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${stylesConfig.colorLight2};
`

export const Button = styled.TouchableOpacity`
  background-color: ${stylesConfig.headerBackgroundColor};
`

export const TextButton = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${stylesConfig.colorLight};
`
