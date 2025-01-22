import type { PropsWithChildren } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useAnimatedRef,
  useAnimatedStyle,
} from "react-native-reanimated";

import { ThemedView } from "@/defaultComponents/ThemedView";
import { useBottomTabOverflow } from "@/defaultComponents/ui/TabBarBackground";
import { useColorScheme } from "@/hooks/useColorScheme";

const HEADER_HEIGHT = 45;

type Props = PropsWithChildren<{
  headerBackgroundColor: { dark: string; light: string };
}>;

export default function ParallaxScrollView({
  children,
  headerBackgroundColor,
}: Props) {
  const colorScheme = useColorScheme() ?? "light";
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const bottom = useBottomTabOverflow();

  const headerAnimatedStyle = useAnimatedStyle(() => {
    // Add your parallax animation logic here, if necessary.

    return {};
  });

  return (
    <ThemedView style={styles.container}>
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        scrollIndicatorInsets={{ bottom }}
        contentContainerStyle={{ paddingBottom: bottom }}
        stickyHeaderIndices={[0]} // Make the header sticky
      >
        <Animated.View
          style={[
            styles.header,
            { backgroundColor: headerBackgroundColor[colorScheme] },
            headerAnimatedStyle,
          ]}
        />
        <ThemedView style={styles.content}>{children}</ThemedView>
      </Animated.ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: HEADER_HEIGHT,
    overflow: "hidden",
  },
  content: {
    flex: 1,
    padding: 8,
    gap: 16,
    overflow: "hidden",
  },
});
