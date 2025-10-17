import React from 'react';
import { View, ViewProps } from 'react-native';

export type ThemedViewProps = ViewProps;

export function ThemedView(props: ThemedViewProps) {
  return <View {...props} />;
}
