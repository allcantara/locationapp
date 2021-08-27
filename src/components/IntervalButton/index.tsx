import React from 'react'
import { IntervalButtonContainer, Text } from './styles'
import { TouchableOpacityProps } from 'react-native'

interface IIntervalButtonProps extends TouchableOpacityProps {
  title: string
  active?: boolean
}

const IntervalButton = ({
  title,
  active = false,
  ...rest
}: IIntervalButtonProps) => {
  return (
    <IntervalButtonContainer active={active} {...rest}>
      <Text active={active}>{title}</Text>
    </IntervalButtonContainer>
  )
}

export default IntervalButton
