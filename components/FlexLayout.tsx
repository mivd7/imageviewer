import React, {FC, ReactNode} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';

const FlexLayout: FC<{children: ReactNode; styles?: StyleProp<ViewStyle>}> = ({
  children,
  styles,
}) => <View style={[baseStyles.container, styles]}>{children}</View>;

export const baseStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 8,
    backgroundColor: 'aliceblue',
  },
  box: {
    width: 100,
    height: 100,
  },
});

export default FlexLayout;
