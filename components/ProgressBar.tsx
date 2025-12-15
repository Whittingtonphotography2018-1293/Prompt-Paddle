import React, { useEffect } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Colors } from '@/constants/Colors';

interface ProgressBarProps {
  progress: number;
  color?: string;
  backgroundColor?: string;
  height?: number;
  style?: ViewStyle;
}

export default function ProgressBar({
  progress,
  color = Colors.primary,
  backgroundColor = Colors.borderLight,
  height = 8,
  style,
}: ProgressBarProps) {
  const animatedProgress = useSharedValue(0);

  useEffect(() => {
    animatedProgress.value = withSpring(Math.min(Math.max(progress, 0), 100));
  }, [progress]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${animatedProgress.value}%`,
    };
  });

  return (
    <View
      style={[
        styles.container,
        { backgroundColor, height, borderRadius: height / 2 },
        style,
      ]}
    >
      <Animated.View
        style={[
          styles.progress,
          { backgroundColor: color, borderRadius: height / 2 },
          animatedStyle,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
  },
});
