import { Ionicons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";

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
          setMenuPosition({ top: pageY - 15, left: pageX - 185 });
        }
      );
    }
    setIsMenuVisible(!isMenuVisible);
  };

  const closeMenu = () => {
    setIsMenuVisible(false);
  };

  const handleOptionClick = (option: string) => {
    console.log(`${option} clicked`);
    closeMenu(); // Close menu after clicking an option
  };

  return (
    <>
      {/* Detect clicks outside the menu */}
      <TouchableOpacity ref={threeDotsRef} onPress={toggleMenu}>
        <Ionicons
          name="ellipsis-vertical"
          size={24}
          color="#000"
          style={{ padding: 5 }}
        />
      </TouchableOpacity>
      <Modal
        transparent={true}
        visible={isMenuVisible}
        onRequestClose={closeMenu}
        animationType="fade"
      >
        <TouchableWithoutFeedback onPress={closeMenu}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View
                style={[
                  styles.menu,
                  {
                    position: "absolute",
                    top: menuPosition.top,
                    left: menuPosition.left,
                  },
                ]}
              >
                {titles?.map((option: any) => (
                  <TouchableOpacity
                    key={option.title}
                    onPress={() => handleOptionClick(option.onPress())}
                    style={{ flexDirection: "row", alignItems: "center" }}
                  >
                    <Ionicons
                      name={option.icon}
                      size={20}
                      color={option.color}
                    />

                    <Text style={styles.menuItem}>{option.title}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </TouchableWithoutFeedback>
          </View>
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
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
  },
  menuItem: {
    padding: 10,
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
});
export default ThreeDotDrawer;
