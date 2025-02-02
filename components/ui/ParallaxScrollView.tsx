import type { PropsWithChildren } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedRef,
  useAnimatedStyle,
} from "react-native-reanimated";

import { ThemedView } from "@/components/ui/ThemedView";
import { useColorScheme } from "@/hooks/useColorScheme";

const HEADER_HEIGHT = 40;

type Props = PropsWithChildren<{
  headerBackgroundColor: { dark: string; light: string };
}>;

export default function ParallaxScrollView({
  children,
  headerBackgroundColor,
}: Props) {
  const colorScheme = useColorScheme() ?? "light";
  const scrollRef = useAnimatedRef<Animated.ScrollView>();

  const headerAnimatedStyle = useAnimatedStyle(() => {
    // Add your parallax animation logic here, if necessary.

    return {};
  });

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        stickyHeaderIndices={[0]} // Make the header sticky
      >
        <View
          style={[
            styles.header,
            { backgroundColor: headerBackgroundColor[colorScheme] },
            // headerAnimatedStyle,
          ]}
        />
        <ThemedView style={styles.content}>{children}</ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  header: {
    height: HEADER_HEIGHT,
    // marginTop: -10,
    overflow: "visible",
  },
  content: {
    flex: 1,
    padding: 8,
    gap: 16,
    overflow: "hidden",
  },
});
