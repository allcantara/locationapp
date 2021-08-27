import styled, { css } from 'styled-components/native'
import { Dimensions, Platform } from 'react-native'
import stylesConfig from '../../config/stylesConfig'

const sizeButton = 71

interface IProps {
  active?: boolean
}

export const IntervalButtonContainer = styled.TouchableOpacity<IProps>`
  background: ${(props) =>
    props.active
      ? stylesConfig.backgroundColorLight2
      : stylesConfig.backgroundColorLight};

  border-color: ${(props) =>
    props.active ? stylesConfig.colorGreen4 : stylesConfig.colorGray2};
  border-width: 1px;

  width: ${sizeButton}px;
  height: ${sizeButton - 10}px;

  justify-content: center;
  align-items: center;
  border-radius: 6px;
  margin: 10px 15px 0 0;
`
export const Text = styled.Text<IProps>`
  color: ${(props) =>
    props.active ? stylesConfig.colorDark : stylesConfig.colorGray3};
  font-weight: ${(props) => (props.active ? 'bold' : 400)};
  font-size: 20px;
`
