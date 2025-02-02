import { Colors } from "@/constants/Colors";
import { ThemedText } from "@/components/ui/ThemedText";
import { ThemedView } from "@/components/ui/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Divider from "./Divider";

const ThreeDotDrawer = ({ titles }: any) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 10 });
  const threeDotsRef = useRef<any>(null);

  const toggleMenu = () => {
    if (threeDotsRef.current) {
      threeDotsRef.current.measure(
        (
          x: number,
          y: number,
          width: number,
          height: number,
          pageX: number,
          pageY: number
        ) => {
          setMenuPosition({ top: pageY - 40, left: pageX - 185 });
        }
      );
    }
    setIsMenuVisible(!isMenuVisible);
  };

  const closeMenu = () => {
    setIsMenuVisible(false);
  };

  const handleOptionClick = (option: any) => {
    closeMenu(); // Close menu after clicking an option
  };

  return (
    <>
      {/* Detect clicks outside the menu */}
      <TouchableOpacity ref={threeDotsRef} onPress={toggleMenu}>
        <Ionicons name="ellipsis-vertical" size={24} color={Colors.primary} />
      </TouchableOpacity>
      <Modal
        transparent={true}
        visible={isMenuVisible}
        onRequestClose={closeMenu}
        animationType="fade"
      >
        <TouchableWithoutFeedback onPress={closeMenu}>
          <ThemedView style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <ThemedView
                darkColor={Colors.dark.cardColor}
                style={[
                  styles.menu,
                  {
                    position: "absolute",
                    top: menuPosition.top,
                    left: menuPosition.left,
                    borderColor: Colors.gray,
                    borderWidth: 1,
                  },
                ]}
              >
                {titles?.map((option: any) => (
                  <View
                    key={option.title}
                    style={{
                      padding: 10,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => handleOptionClick(option.onPress())}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <Ionicons
                        name={option.icon}
                        size={20}
                        color={option.color}
                      />

                      <ThemedText>{option.title}</ThemedText>
                    </TouchableOpacity>
                  </View>
                ))}
              </ThemedView>
            </TouchableWithoutFeedback>
          </ThemedView>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  menu: {
    width: 200,
    borderRadius: 5,
    padding: 10,
  },
});
export default ThreeDotDrawer;
