import React, { ReactNode } from 'react';
import { ScrollView, ScrollViewProps } from 'react-native';

export type ParallaxScrollViewProps = ScrollViewProps & {
  children: ReactNode;
  headerImage?: ReactNode;
  headerBackgroundColor?: { dark: string; light: string };
};

export function ParallaxScrollView({ children, headerImage, ...props }: ParallaxScrollViewProps) {
  return (
    <ScrollView {...props}>
      {headerImage}
      {children}
    </ScrollView>
  );
}
