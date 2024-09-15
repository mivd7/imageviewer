import React, {FC, ReactNode} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';

const FlexLayout: FC<{children: ReactNode; styles?: StyleProp<ViewStyle>}> = ({
  children,
  styles,
}) => <View style={[baseStyles.container, styles]}>{children}</View>;

export const baseStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    backgroundColor: 'aliceblue',
  },
  box: {
    width: 80,
    height: 80,
  },
});

export default FlexLayout;
