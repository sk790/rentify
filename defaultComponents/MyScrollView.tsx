import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ThemedView } from "./ThemedView";
import type { PropsWithChildren } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
type Props = PropsWithChildren<{
  headerBackgroundColor: { dark: string; light: string };
}>;

export default function MyScrollView({
  children,
  headerBackgroundColor,
}: Props) {
  const inset = useSafeAreaInsets();
  return (
    <ThemedView style={{ flex: 1 }}>
      <ScrollView
        stickyHeaderIndices={[0]} // Make the header sticky
      >
        <View style={{ height: 40, backgroundColor: "red" }} />
        <ThemedView>{children}</ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({});
