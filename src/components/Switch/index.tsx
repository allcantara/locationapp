import React from 'react'
import { Switch as RNSwitch } from 'react-native'
import stylesConfig from '../../config/stylesConfig'

interface ISwitchProps {
  isEnabled: boolean
  toggleSwitch: () => void
}

const Switch = ({ isEnabled, toggleSwitch }: ISwitchProps) => {
  return (
    <RNSwitch
      trackColor={{
        false: stylesConfig.colorGray2,
        true: stylesConfig.colorGray2,
      }}
      thumbColor={
        isEnabled ? stylesConfig.colorGreen4 : stylesConfig.colorGray3
      }
      ios_backgroundColor={stylesConfig.colorGray2}
      onValueChange={toggleSwitch}
      value={isEnabled}
    />
  )
}

export default Switch
