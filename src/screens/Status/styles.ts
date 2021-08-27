import styled from 'styled-components/native';
import stylesConfig from '../../config/stylesConfig';

export const StatusContainer = styled.View`
  flex: 1;
  background: ${stylesConfig.backgroundColorLight};
  padding: 20px ${stylesConfig.paddingHorizontal};
  `;

export const PackageFlatlist = styled.FlatList`
  flex: 1;
`;

export const PackageItem = styled.View`
  flex-direction: row;
  padding: 14px 0;
  justify-content: space-between;
`;

export const PackageTextView = styled.View``;

export const PackageID = styled.Text`
  color: ${stylesConfig.colorDark};
  font-size: 20px;
`;

export const PackageStatus = styled.Text`
  color: ${stylesConfig.colorDark};
  font-size: 15px;
  margin-top: 4px;
`;

export const TimeText = styled.Text`
  color: ${stylesConfig.colorGray};
  font-size: 16px;
  margin-top: 4px;
`;
